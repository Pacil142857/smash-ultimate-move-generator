// Note: This was originally written in Python
// I was too lazy to rewrite it in JS, so I used an online JS to Python converter
// This explains part of the bad formatting
// The other reason why this is formatted poorly is because this is a very short project that I just want to hack together and be done with

// Does not include getup attack
const sharedMoves = ['Jab', 'Forward Tilt', 'Up Tilt', 'Down Tilt', 'Dash Attack',
                'Forward Smash', 'Up Smash', 'Down Smash', 'Neutral Air',
                'Forward Air', 'Back Air', 'Up Air', 'Down Air',
                'Neutral Special', 'Side Special', 'Up Special',
                'Down Special'];

class Character {
    constructor(name) {
        this.name = name;
        this.moves = [...sharedMoves];
    }
    
    clearMoves() {
        this.moves = [];
    }

    setMoves(moves) {
        this.moves = moves;
    }

    removeMove(move) {
        const index = this.moves.indexOf(move);
        if (index !== -1) {
            this.moves.splice(index, 1);
        }
    }

    removeMoves(moves) {
        for (const move of moves) {
            this.removeMove(move);
        }
    }

    replaceMoves(replacedMoves, newMoves) {
        this.removeMoves(replacedMoves);
        this.moves = this.moves.concat(newMoves);
    }

    addMove(move) {
        this.moves.push(move);
    }

    addMoves(moves) {
        this.moves = this.moves.concat(moves);
    }

    getMove() {
        return this.moves[Math.floor(Math.random() * this.moves.length)];
    }

    getNumMoves() {
        return this.moves.length;
    }

    getName() {
        return this.name;
    }
}

class Characters extends Character {
    pickNewCharacter() {
        // Pick a random character
        // The RNG is weighted by the number of moves each character has
        let weights = this.characters.map(c => c.getNumMoves());
        for (let i = 1; i < weights.length; i++) {
            weights[i] += weights[i - 1];
        }
        let random = Math.random() * weights[weights.length - 1];

        this.curCharacter = this.characters[0];
        for (let i = 0; i < weights.length; i++) {
            if (weights[i] > random) {
                this.curCharacter = this.characters[i];
                break;
            }
        }
    }

    constructor(chars) {
        super("Something bad happened");
        this.characters = chars;
        this.pickNewCharacter();
    }

    // Picks a new character
    getMove() {
        const move = this.curCharacter.getMove();
        this.pickNewCharacter();
        return move;
    }

    // Does not pick a new character
    getName() {
        return this.curCharacter.getName();
    }
}

const characterNames = ['Mario', 'Donkey Kong', 'Link', 'Samus', 'Yoshi', 'Kirby', 'Fox', 'Pikachu', 'Luigi', 'Ness', 'Captain Falcon', 'Jigglypuff', 'Peach', 'Bowser', 'Ice Climbers', 'Sheik', 'Zelda', 'Dr. Mario', 'Pichu', 'Falco', 'Marth', 'Young Link', 'Ganondorf', 'Mewtwo', 'Roy', 'Mr. Game & Watch', 'Meta Knight', 'Pit', 'Zero Suit Samus', 'Wario', 'Snake', 'Ike', 'Pokémon Trainer', 'Diddy Kong', 'Lucas', 'Sonic', 'King Dedede', 'Olimar', 'Lucario', 'R.O.B.', 'Toon Link', 'Wolf', 'Villager', 'Megaman', 'Wii Fit Trainer', 'Rosalina & Luma', 'Little Mac', 'Greninja', 'Mii Brawler', 'Mii Swordfighter', 'Mii Gunner', 'Palutena', 'Pac-Man', 'Robin', 'Shulk', 'Bowser Jr.', 'Duck Hunt', 'Ryu', 'Ken', 'Cloud', 'Corrin', 'Bayonetta', 'Inkling', 'Ridley', 'Simon', 'King K. Rool', 'Isabelle', 'Incineroar', 'Piranha Plant', 'Joker', 'Hero', 'Banjo & Kazooie', 'Terry', 'Squirtle', 'Ivysaur', 'Charizard', 'Ryu/Ken (either)', 'Piranha Plant', 'Byleth', 'Min Min', 'Steve', 'Sephiroth', 'Pyra', 'Mythra', 'Kazuya', 'Sora', 'Pyra/Mythra (either)'];
const characters = characterNames.map(name => new Character(name));

const specialMoves = ['Neutral Special', 'Up Special', 'Side Special', 'Down Special'];
const ptChars = [];
const shotos = [];
const pam = [];

// Handle all of the non-standard characters
for (let i = 0; i < characters.length; i++) {
    const character = characters[i];
    const name = character.getName();
    
    // Characters that replace a move with a set of moves
    // Mii Brawler, Mii Swordfighter, Mii Gunner, Hero, Sora, Cloud, Joker
    if (name === 'Mii Brawler') {
        character.replaceMoves(specialMoves,
                                ['Shot Put, Flashing Mach Punch, Exploding Side Kick',
                                 'Onslaught', 'Burning Drop Kick', 'Suplex',
                                 'Soaring Axe Kick', 'Helicopter Kick', 'Thrust Uppercut',
                                 'Head-On Assault', 'Feint Jump', 'Counter Throw']);
    } else if (name === 'Mii Swordfighter') {
        character.replaceMoves(specialMoves,
                                ['Gale Strike', 'Shuriken of Light', 'Blurring Blade',
                                 'Airborne Assault', 'Chakram', 'Gale Stab',
                                 'Stone Scabbard', 'Skyward Slash Dash', 'Hero\'s Spin',
                                 'Blade Counter', 'Reversal Slash', 'Power Thrust']);
    } else if (name === 'Mii Gunner') {
        character.replaceMoves(specialMoves,
                                ['Charge Blast', 'Laser Blaze', 'Grenade Launch',
                                 'Flame Pillar', 'Stealth Burst', 'Gunner Missile',
                                 'Lunar Launch', 'Cannon Jump Kick', 'Arm Rocket',
                                 'Echo Reflector', 'Bomb Drop', 'Absorbing Vortex']);
    } else if (name === 'Hero') {
        character.replaceMoves(['Down Special'],
                                ['Sizz', 'Sizzle', 'Bang', 'Kaboom', 'Snooze',
                                 'Flame Slash', 'Kacrackle Slash', 'Metal Slash', 'Hatchet Man',
                                 'Whack', 'Thwack', 'Magic Burst', 'Kamikazee', 'Psych Up',
                                 'Oomph', 'Acceleratle', 'Kaclang', 'Bounce', 'Heal',
                                 'Zoom', 'Hocus Pocus']);
    } else if (name === 'Sora') {
        character.replaceMoves(['Neutral Special'], ['Firaga', 'Thundaga', 'Blizzaga']);
    } else if (name === 'Cloud') {
        character.replaceMoves(['Down Special'], ['Limit Charge', 'Finishing Touch']);
    } else if (name === 'Joker') {
        character.replaceMoves(['Down Special'], ['Rebel\'s Guard', 'Tetrakarn/Makarakarn']);
    }

    // Characters that add new moves
    // Bowser Jr., Little Mac
    else if (name === 'Bowser Jr.') {
        character.addMove('Hammer Attack (during Up Special)');
    } else if (name === 'Little Mac') {
        character.addMove('KO Punch');
    }

    // Characters that remove moves
    // Mega Man, Pokémon Trainer, Squirtle, Ivysaur, Charizard,
    // Pyra, Mythra, Pyra/Mythra (either)
    else if (name === 'Mega Man') {
        character.removeMoves(['Forward Tilt', 'Neutral Air']);
    } else if (name === 'Pokémon Trainer' || name === 'Pyra/Mythra (either)') {
        character.setMoves(['Down Special']);
        if (name === 'Pokémon Trainer') {
            ptChars.push(character);
        } else if (name === 'Pyra/Mythra (either)') {
            pam.push(character);
        }
    } else if (name === 'Squirtle' || name === 'Ivysaur' || name === 'Charizard') {
        character.removeMove('Down Special');
        ptChars.push(character);
    } else if (name === 'Pyra' || name === 'Mythra') {
        character.removeMove('Down Special');
        pam.push(character);
    }

    // Weirdos
    // Ryu, Ken, Ryu/Ken (either)
    else if (name === 'Ryu/Ken (either)') {
        character.setMoves(['Light Jab', 'Heavy Jab (Close)',
                             'Light Forward Tilt (Close)', 'Light Forward Tilt (Far)',
                             'Light Up Tilt', 'Heavy Up Tilt', 'LIght Down Tilt',
                             'Heavy Down Tilt', 'Dash Attack', 'Up Smash',
                             'Down Smash', 'Forward Air', 'Back Air', 'Down Air',
                             'Hadoken', 'Tatsumaki Senpukyaku', 'Shoryuken',
                             'Focus Attack']);
        shotos.push(character);
    } else if (name === 'Ryu' || name === 'Ken') {
        character.setMoves(['Heavy Jab (Far)', 'Heavy Forward Tilt',
                             'Forward Smash', 'Neutral Air', 'Up Air']);
        shotos.push(character);
        if (name === 'Ryu') {
            character.addMoves(['Shakunetsu Hadoken']);
        } else if (name === 'Ken') {
            character.addMoves(['Roundhouse (Oosoto Mawashi Geri)',
                                 'Crescent Kick (Nata Otoshi Geri)']);
        }
    }

    // Terry
    else if (name === 'Terry') {
        character.addMoves(['Spotdodge Attack', 'Buster Wolf', 'Power Geyser']);
        character.replaceMoves(['Side Special'], ['Burn Knuckle', 'Crack Shoot']);
    }
    // Min Min
    else if (name === 'Min Min') {
        character.removeMoves(['Forward Air', 'Back Air', 'Side Special', 'Neutral Special']);
        const arms = ['Ram Ram', 'Dragon', 'Megawatt'];
        for (const move of ['Forward Tilt', 'Forward Smash', 'Neutral Air']) {
            const newMoves = arms.map(arm => `${arm} ${move}`);
            character.replaceMoves([move], newMoves);
        }
    }
    // Kazuya
    else if (name === 'Kazuya') {
        character.setMoves(['Ten Hit Combo (Jab)', 'Forward Tilt (Oni Front Kick)',
                             'Down-Forward Tilt (Tsunami Kick)', 'Down Tilt (Neijiri Uraken)',
                             'Down-Back Tilt (Stature Smash)', 'Back Tilt (Flash Tornado)',
                             'Up-Back Tilt (Jump Side Kick)', 'Up Tilt (Twin Pistons)',
                             'Up-Forward Tilt (Roundhouse to Triple Spin Kicks)',
                             'Crouching Down-Forward Tilt (Tombstone Crusher)',
                             'Crouching Down Tilt (Crouch Jab)',
                             'Crouching Down-Back Tilt (Crouch Spin Kick)',
                             'Dash Attack', 'Double Dash Attack (Left Splits Kick)',
                             'Forward Smash', 'Up Smash', 'Down Smash',
                             'Uncrouching Attack (Demon God Fist)', 'Electric Wind God Fist',
                             'Dragon Uppercut (Shroyuken Input with the Attack button)',
                             'Spinning Demon to Left Hook (Shoryuken Input with the Special button)',
                             'Neutral Air', 'Forward Air', 'Back Air', 'Up Air', 'Down Air',
                             'Neutral Special', 'Side Special', 'Up Special', 'Down Special/Rage Drive',
                             'Gates of Hell (Shoryuken Input with the Grab button)']);
    }
    // Steve
    else if (name === 'Steve') {
        character.removeMoves(['Up Air', 'Forward Tilt']);
        character.replaceMoves(['Neutral Special'], ['Mine', 'Place Block']);
    }

    // Zair characters
    if (['Samus', 'Luigi', 'Zero Suit Samus', 'Lucas', 'Young Link', 'Toon Link'].includes(name)) {
        character.addMove('Zair');
    }
}

// Group together certain characters
// Squirtle/Ivysaur/Charizard, Ryu/Ken, Pyra/Mythra
const ptChar = new Characters(ptChars);
const aegis = new Characters(pam);
const shoto = new Characters(shotos);

// Remove individual characters from the list of characters
for (let i = characters.length - 1; i >= 0; i--) {
    if (ptChars.includes(characters[i]) || pam.includes(characters[i]) || shotos.includes(characters[i])) {
        characters.splice(i, 1);
    }
}
characters.push(ptChar, aegis, shoto);

// The actual code
function getRandomMove() {
    const selectedChar = characters[Math.floor(Math.random() * characters.length)];
    return [selectedChar.getName(), selectedChar.getMove()];
}

function generateMoves() {
    const result = getRandomMove();
    document.getElementById('character').innerHTML = result[0];
    document.getElementById('move').innerHTML = result[1];
}

document.addEventListener("DOMContentLoaded", () => generateMoves());

const addButton = document.getElementById("add-button");
const removeButton = document.getElementById("remove-button");
const counter = document.getElementById("point-counter");
addButton.addEventListener("click", () => counter.innerHTML++);
removeButton.addEventListener("click", () => counter.innerHTML--);
