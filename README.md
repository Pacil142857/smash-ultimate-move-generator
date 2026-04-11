# Smash Ultimate Move Generator
A random move generator for Super Smash Bros. Ultimate. Moves from Echo Fighters (except Ken) are not included.

Most characters have their standard moves and dash attack, but not getup attack, grab, pummel, throws, or taunts (even damage-dealing taunts). Fighting game characters have their input moves (e.g., Power Geyser).

The RNG works as follows: A random character is chosen—then, a random move from that character is chosen. When choosing a random character, there are three groups of characters that collectively have the same probability as being chosen as any other character; these groups are:
* Pokémon Trainer, Squirtle, Ivysaur, Charizard
* Pyra, Mythra, Both (they share down special)
* Ryu, Ken, Both

When one of these groups of characters is chosen, a specific character is chosen randomly such that characters with more moves are more likely to be chosen. Therefore, even though Pokémon Trainer has only one move (down special), they are not 25% likely to be chosen.

Many unique moves are included, such as Terry's spot dodge attack or Kazuya's entire moveset. Some moves are broken up into separate moves (e.g., Hero's Menu is broken up into Bang, Kaboom, etc.), while others aren't (e.g., Hero's neutral and side specials).
