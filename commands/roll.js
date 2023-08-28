const { InteractionResponseType } = require( 'discord-interactions' );
const { SlashCommandBuilder } = require( '@discordjs/builders' );
const { DiceRoll } = require( '@dice-roller/rpg-dice-roller' );

const data = new SlashCommandBuilder()
  .setName( 'roll' )
  .setDescription( 'Roll a dice. Internally uses `@dice-roller/rpg-dice-roller`' )
  .addStringOption( ( op ) => op
    .setName( 'notation' )
    .setDescription( 'It accepts dice notations.' )
    .setRequired( false )
  );

const func = async ( interaction, res ) => {
  const options = interaction.data.options;

  const notation = options?.find( ( v ) => v.name === 'notation' )?.value ?? 'd6';

  const roll = new DiceRoll( notation );

  await res.send( {
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: roll.output,
    },
  } );
};

module.exports = { data, func };
