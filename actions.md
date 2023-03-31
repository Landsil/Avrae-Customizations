Those are actions you can configure per character via Avrae dashboard or via pasting command into discord.
You can have a look at your here: https://avrae.io/dashboard/characters

Check [aliases-snippets](https://github.com/Landsil/Avrae-Customizations/blob/main/aliases-snippets.md) page to see how you can configure those.

## Medalio of Horizonback
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
