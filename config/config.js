var config = {
	server: {
		port: process.env.PORT || 3000,
		cookieMaxAge: 86400000
	},
	speech: {
		languageCode: 'en-US',
		stt: {
			encoding: 'LINEAR16',
			sampleRate: 16000,
			// To use speechContexts, use this format for `contextFilePaths`:
			/*{
				order: 'config/speech-expected-sentences.json',
				confirmation: ''
			},*/
			// Note: don't use contextFilePaths together with `adaptation`
			contextFilePaths: null,
			// Adaptations to create and use in the speech recognition model
			// Adaptations are made up of Phrase Sets and Classes. 
			// See https://cloud.google.com/speech-to-text/docs/adaptation-model#improve_transcription_results_using_a_customclass
			// and https://googleapis.dev/nodejs/speech/latest/v1p1beta1.AdaptationClient.html
			//
			// Notes: 
			// -> New adaptations are only created from `adaptations.configuration` if `adaptations.create` is set to true. Otherwise
			// nothing is done, and the last set adaptations will be used.
			// -> If `adaptations.override` is true then even if an adaptation with the same name already exists
			// it will be redifined, else only the adaptations whose name doesn't already exist will be defined.
			adaptations: {
				create: true,
				override: true,
				configuration: {
					customClasses: [
						{
							name: 'order-polarity',
							items: ['buy', 'sell']
						},
						{
							name: 'coins',
							items: ['bitcoin', 'ether']
						},
						{
							name: 'order-type',
							items: ['market', 'limit', 'range']
					],
					// Note: custom classes are refered to as '${my-custom-class}' and then replaced in services/speech.js
					// by its respective url location in projects/project_id/locations (...)
					// -> For each phrase you can mix up as you please Custom Classes, pre-defined Classes and arbitrary text
					phraseSets: [
						{
							name: 'order',
							phrases: [
								'${order-polarity}',
								'${coins}',
								'${order-type}',
								'$OOV_CLASS_DIGIT_SEQUENCE',
								'$OPERAND'
							],
							boost: 20
						},
						{
							name: 'confirmation',
							phrases: [
								'yes',
								'no'
							],
							boost: 20
						}
					]
				}
			}
		},
		tts: {
			encoding: 'MP3',
			voiceName: 'en-US-Wavenet-G',
			pitch: 3.2,
			speakingRate: 1
		}
	}
}

module.exports = config;