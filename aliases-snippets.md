Those are both basic and come fancy aliases and snippets for Avrae.
You can copy whole command into discord and run it to add it.
Can be found at https://avrae.io/dashboard/aliases in either of the tabs.

Check [Actions](https://github.com/Landsil/Avrae-Customizations/blob/main/actions.md) page to see how you can configure actions in this way.

## Aliaes
Those are shortuts to run longer commands, you can use them instead of having a table with commands where you copy paste from.

This will make it so `!Ali` changes my character to Alistair, straight up lazines.
```yaml
!alias Ali char Alistair
```

This will make it so `!sneak` runs a stealth command, you have a space there to add any advantege or bonuses you may have to you never have to type them manually. It may be worth the hassle to add notes for them so people know why you have advante for eg.
```yaml
!multiline
!c stealth
```

## Snippets
Those have to be used as part of other commands.

This will make it so adding `bb` to attack will include appropirate Booming Blade usage.
```yaml
!snippet bb -d "{{"0" if level<5 else ("1" if level<11 else "2" if level<17 else "3")+"d8"}} [thunder]" -f "Booming Blade | On a hit, the target immediately takes {{vroll(str((("1" if level<5 else "2" if level<11 else "3" if level<17 else "4") +"d8")))}} thunder damage if it willingly moves before the start of your next turn."
```

This will make it so adding `pw` to attack will include appropirate Planar Warrior usage.
```yaml
!snippet pw -d1 "{{2 if character().levels.get('Ranger') >= 11 else 1}}d8 [force]" -dtype force -f "Planar Warrior|As a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack."
```

This will add well described `Exhaustion` counter. There is no automation but helps remembering.
```yaml
!cc create "Exhaustion" -t "Exhaustion" -desc "1- Disadvantage on ability checks
2- Speed halved
3- Disadvantage on attack rolls and saving throws
4- Hit point maximum halved
5- Speed reduced to 0
6- Death
Finishing a long rest reduces a creature's exhaustion level by 1, provided that the creature has also ingested some food and drink. Also, being raised from the dead reduces a creature’s exhaustion level by 1." -reset long -resetby -1 -max 6 -min 0 -type bubble -value 0
```
