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
___

This will make it so `!lifecast` let's you cast healing magic correctly as a Life Cleric
```yaml
!alias lifecast {{a,c=&ARGS&,combat()}}{{H=not a or 'help' in a or '?' in a}}{{'embed' if H else  'cast'}} %1% -l &2& -d -(2+&2&) 
{{H or (f'max -f "Supreme Healing|When you would normally roll one or more dice to restore hit points with a spell, you instead use the highest number possible for each die."' if int(get('ClericLevel',0))>16 else '')}}
{{' '.join([(f'"{i}"' if ' ' in i else i) for i in &ARGS&[2:]])}}
{{T,t=[c.get_combatant(x)or c.get_group(x)for x in a[2:]if a[a.index(x)-1]=='-t' and c and c.me],[]}}
{{[t.append(i)if'c'in i.type else[t.append(e)for e in i.combatants]for i in T if i]}}
{{self=sum([1 if x.name==c.me.name else -1 for x in t])>=1}}
{{H or mod_hp(2+int('&2&'),0) or f'-f "Blessed Healer|When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell\'s level.\n<{name}>: {hp_str()} (+{2+int("&2&")})"' if int(get('ClericLevel',0))>5 and not self else ''}}
{{not H or """-title "Help for casting as a Life Cleric" -desc '`!lifecast <\"spell name\"> <level> [args]`\n\nCasts healing spells, granting appropriate bonuses for a Life Domain Cleric.\nApplies Disciple of Life, Blessed Healer, and/or Supreme healing depending on your `ClericLevel`\nYou can use any args or snippets you would normally use on spells (see `!help cast`)\n\n**Example**\n`!lifecast \"Cure Wounds\" 9 -d 10` to cast `Cure Wounds` at `9`th level with an extra 10 healing' """}}
```
___

This will make it so `!sneak` runs a stealth command, you have a space there to add any advantege or bonuses you may have to you never have to type them manually. It may be worth the hassle to add notes for them so people know why you have advante for eg.
```yaml
!multiline
!c stealth
```

## Snippets
Those have to be used as part of other commands.
___

This will make it so adding `bb` to attack will include appropirate Booming Blade usage.
```yaml
!snippet bb -d "{{"0" if level<5 else ("1" if level<11 else "2" if level<17 else "3")+"d8"}} [thunder]" -f "Booming Blade | On a hit, the target immediately takes {{vroll(str((("1" if level<5 else "2" if level<11 else "3" if level<17 else "4") +"d8")))}} thunder damage if it willingly moves before the start of your next turn."
```
___

This will make it so adding `pw` to attack will include appropirate Planar Warrior usage.
```yaml
!snippet pw -d1 "{{2 if character().levels.get('Ranger') >= 11 else 1}}d8 [force]" -dtype force -f "Planar Warrior|As a bonus action, choose one creature you can see within 30 feet of you. The next time you hit that creature on this turn with a weapon attack, all damage dealt by the attack becomes force damage, and the creature takes an extra 1d8 force damage from the attack."
```
___

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
___
This will make it so adding `ff` to attack will include appropirate Favored Foe usage.
```yaml
!snippet ff -d1 "{{"1d4" if RangerLevel<6 else "1d6" if RangerLevel<14 else "1d8"}}" -f "Favored Foe|The first time on each of your turns that you hit the favored enemy and deal damage to it, including when you mark it, you can increase that damage by 1d4. This feature's extra damage increases when you reach certain levels in this class: to 1d6 at 6th level and to 1d8 at 14th level."
```
