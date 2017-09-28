/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This app is from amazon's provided sample skill built with Amazon Alexa Skills nodejs
 * skill development kit. The source is https://github.com/alexa/skill-sample-nodejs-howto
 **/

'use strict';

const Alexa = require('alexa-sdk');
const recipes = require('./recipes');
const APP_ID = 'amzn1.ask.skill.b339d80f-6f67-4945-856a-08913fe1c7d5'; // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en': {
        translation: {
            RECIPES: recipes.CLASS_EN_US,
            SKILL_NAME: 'URI Course Lookup',
            WELCOME_MESSAGE: "Welcome to %s. You can ask a question like, what is the course number for American Art? Now, what can I help you with?",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s',
            HELP_MESSAGE: "You can ask questions such as, what\'s the course number for Applied Calculus 1, you can also say exit... Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, what is the course number for Fish Nutrition, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
            RECIPE_REPEAT_MESSAGE: 'Try saying repeat.',
            RECIPE_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know ",
            RECIPE_NOT_FOUND_WITH_ITEM_NAME: 'the course number for %s. ',
            RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: 'that class. ',
            RECIPE_NOT_FOUND_REPROMPT: 'What else can I help with?',
        },
    },
};

const handlers = {
    'LaunchRequest': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'ClassIntent': function () {
        const itemSlot = this.event.request.intent.slots.Item;
        let itemName;
        if (itemSlot && itemSlot.value) {
            itemName = itemSlot.value.toLowerCase();
        }
        else {
            itemName = 'that class';
        }
        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), (itemName.charAt(0).toUpperCase()) + itemName.slice(1));
        const myRecipes = this.t('RECIPES');
       
        const recipe = myRecipes[itemName];

        if (recipe) {
            this.attributes.speechOutput = recipe;
            this.attributes.repromptSpeech = this.t('RECIPE_REPEAT_MESSAGE');
			if (recipe !== 'sources')
			{
				this.emit(':askWithCard',"The course code is " + recipe + ".; Ask something else; or say quit", this.attributes.repromptSpeech, cardTitle, itemName + ": \n" + recipe);
			}
        } else {
            let speechOutput = this.t('RECIPE_NOT_FOUND_MESSAGE');
            const repromptSpeech = this.t('RECIPE_NOT_FOUND_REPROMPT');
            if (itemName) {
                speechOutput += this.t('RECIPE_NOT_FOUND_WITH_ITEM_NAME', itemName);
            } else {
                speechOutput += this.t('RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME');
            }
            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
