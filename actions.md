Those are actions you can configure per character via Avrae dashboard or via pasting command into discord.
You can have a look at your here: https://avrae.io/dashboard/characters

Check [aliases-snippets](https://github.com/Landsil/Avrae-Customizations/blob/main/aliases-snippets.md) page to see how you can configure those.

## Medalion of Horizonback
You can make a Custom Counter via `!cc create Horizonback` and then add to it medalions as you buy them with `!cc Horizonback +1`
Then you can run this command that when you get hit will let you use `!a horizonback` to post info and get AC.    
You will have to take HP back manually tho.
```yaml
!a import name: Medal of the Horizonback
automation:
  - type: target
    target: self
    effects:
      - type: ieffect2
        name: Medal of the Horizonback
        duration: "1"
        effects:
          ac_bonus: "5"
        attacks: []
        buttons: []
        end: false
        conc: false
        desc: When you would be hit by an attack, you can use your reaction to increase
          your AC by 5 until the start of your next turn, including against the
          triggering attack. You must be wearing the medal and able to see the
          creature that made the triggering attack to use this property. Once
          this property has been used, it can’t be used again, and the medal
          becomes nonmagical.
        stacking: false
        save_as: null
        parent: null
      - type: counter
        counter: Horizonback
        amount: "1"
        allowOverflow: false
        errorBehaviour: warn
_v: 2
verb: uses
activation_type: 4
```

## Weapon with choise example    
`  value: choice and choice in 'wallop'` import whole thing and edit in avrae dashboard of custom actions.

```yaml
name: Heavy Crossbow
automation:
- type: variable
  name: walloping_ammo
  value: choice and choice in 'wallop'
  onError: '0'
- type: target
  target: each
  effects:
  - type: condition
    condition: walloping_ammo
    onTrue:
    - type: counter
      counter: Walloping Bolts
      amount: '1'
      errorBehaviour:
    onFalse: []
    errorBehaviour: 'false'
  - type: attack
    hit:
    - type: condition
      condition: lastCounterUsedAmount
      onTrue:
      - type: damage
        damage: 1d10 + {dexterityMod} [magical piercing]
        overheal: false
      - type: save
        stat: str
        dc: '10'
        fail:
        - type: ieffect2
          name: Prone
          duration: -1
          effects:
            attack_advantage: -1
          desc: A prone creature's only movement option is to crawl, unless it stands up and thereby ends the condition
          buttons:
          - automation:
            - type: remove_ieffect
              removeParent:
            label: Stand Up
            verb: stands up
        success: []
      - type: text
        text: This ammunition packs a wallop. A creature hit by the ammunition must succeed on a DC 10 Strength saving throw or be knocked prone.
      onFalse:
      - type: damage
        damage: 1d10 + {dexterityMod} [piercing]
        overheal: false
      errorBehaviour: 'false'
    miss: []
    attackBonus: dexterityMod + proficiencyBonus
- type: text
  text: Raifyire keeps his larger crossbow well oiled and maintained. On it in various places are various mementos.
_v: 2
```
