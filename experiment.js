const jsPsych = initJsPsych({
  on_finish: function () {
    // jsPsych.data.displayData("csv");
  },
});
let timeline = [];

const subject_id = jsPsych.randomization.randomID(10);

const irb = {
  // Which plugin to use
  type: jsPsychHtmlButtonResponse,
  // What should be displayed on the screen
  stimulus:
    '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
  // What should the button(s) say
  choices: ["Continue"],
};
// push to the timeline
timeline.push(irb);

const instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus:
    "In this experiment, you will see a series of words.<br>Please read the onscreen word aloud.<br>Try to respond as quickly and accurately as you can.<br>When you're ready to begin, press the space bar.",
  choices: [" "],
};
timeline.push(instructions);

var initialize = {
  type: jsPsychInitializeMicrophone,
};
timeline.push(initialize);

var time_through = 1;
var num = 0;

const trials = {
  timeline: [
    {
      type: jsPsychHtmlAudioResponse,
      stimulus: function () {
        return `
      <p style="font-size:48px; color:black;">${jsPsych.timelineVariable(
        "stimulus"
      )}</p>
    <p>Speak the above word.</p>
    <div class="loading">
      <div class="progress-bar">
        <span></span>
      </div>
    </div>
    `;
      },
      recording_duration: 3500,
      show_done_button: true,
      done_button_label: "Continue",
      allow_playback: true,
      record_again_button_label: "Record Again",
      accept_button_label: "Continue",
      on_finish: function (data) {
        num++;
        if (num > 3) {
          time_through++;
          num = 1;
        }
        // id, block, order, global attempt number
        const filename = `${subject_id}_b${time_through}_#${num}_a${
          jsPsych.getProgress().current_trial_global
        }_${jsPsych.timelineVariable("stimulus")}_audio.webm`;
        jsPsychPipe.saveBase64Data("OINjRk5EIMi8", filename, data.response);
        // delete the base64 data to save space. store the filename instead.
        data.response = filename;
      },
    },
    // {
    //   type: jsPsychHtmlKeyboardResponse,
    //   choices: [""],
    //   stimulus: "",
    //   response_ends_trial: false,
    //   trial_duration: 1000,
    // },
  ],
  timeline_variables: [
    { stimulus: "O.K." },
    { stimulus: "OK" },
    { stimulus: "ok" },
    // { stimulus: "Ok" },
    // { stimulus: "ok ok" },
    // { stimulus: "ok," },
    // { stimulus: "ok!" },
    // { stimulus: "Ok!" },
    // { stimulus: "OK!" },
    // { stimulus: "ok." },
    // { stimulus: "OK." },
    // { stimulus: "okay" },
    // { stimulus: "Okay" },
    // { stimulus: "OKAY" },
    // { stimulus: "okay!" },
    // { stimulus: "Okay!" },
    // { stimulus: "okay." },
    // { stimulus: "Okay." },
    // { stimulus: "okayy" },
    // { stimulus: "okey" },
    // { stimulus: "oki" },
    // { stimulus: "okie" },
    // { stimulus: "okii" },
    // { stimulus: "okk" },
    // { stimulus: "okok" },
  ],
  randomize_order: true,
};

const num_blocks = 3;

for (let block = 0; block < num_blocks; block++) {
  timeline.push(trials);
}

const post_survey = {
  type: jsPsychSurvey,
  survey_json: {
    pages: [
      {
        name: "page_1",
        title: "Habits",
        elements: [
          {
            type: "matrix",
            title:
              "Please indicate if you agree or disagree with the following statements on a scale from 1 (Strongly Disagree) to 4 (Strongly Agree).",
            columns: [
              {
                value: 1,
                text: "1",
              },
              {
                value: 2,
                text: "2",
              },
              {
                value: 3,
                text: "3",
              },
              {
                value: 4,
                text: "4",
              },
              // {
              //   value: 5,
              //   text: "5",
              // },
            ],
            rows: [
              {
                value: "frequency",
                text: "I frequently send text messages throughout the day.",
              },
              {
                value: "preference in general",
                text: "I prefer texting over making phone calls.",
              },
              {
                value: "promptness",
                text: "I always respond to text messages promptly.",
              },
              {
                value: "emojis",
                text: "I commonly use emojis or symbols to convey meaning instead of words.",
              },
              {
                value: "re-read",
                text: "I often re-read my messages before sending them.",
              },
              {
                value: "abbreviations",
                text: "I enjoy using text-based abbreviations to convey information quickly (e.g., 'FYI,' 'BTW').",
              },
              {
                value: "primary mode",
                text: "I use texting as my primary mode of communication with most people.",
              },
              {
                value: "speed over accuracy",
                text: "I tend to prioritize speed over accuracy when typing out text messages.",
              },
              {
                value: "conventions",
                text: "I find it natural to adapt to the language and spelling conventions commonly used in texting.",
              },
              {
                value: "experimenting",
                text: "I enjoy experimenting with new abbreviations or slang terms in my text messages.",
              },
              {
                value: "preference for plans",
                text: "I prefer texting for making plans rather than calling.",
              },
              {
                value: "seek new slang",
                text: "I actively seek out new abbreviations, slang terms, that emerge in online culture to stay current and connected in my text communications.",
              },
              {
                value: "unconventional punctuation",
                text: "I'm comfortable using unconventional punctuation or capitalization in my texts.",
              },
              {
                value: "creativity",
                text: "I enjoy the creativity involved in adapting language and spelling for text messaging.",
              },
              {
                value: "internet slang",
                text: "I frequently incorporate internet slang into my text messages.",
              },
              {
                value: "multiple conversations",
                text: "I'm comfortable with having multiple conversations simultaneously via text.",
              },
              {
                value: "informal",
                text: "I prefer using informal language over formal language and proper spelling.",
              },
              {
                value: "preference during work",
                text: "I prefer texting during work or school hours rather than calling.",
              },
              {
                value: "digits",
                text: "I often use numerical digits instead of spelling out numbers in my text messages.",
              },
              {
                value: "adapt for other's habits",
                text: "I often adapt my texting styles based on the preferences and habits of the person I/’m texting.",
              },
              {
                value: "adapt for identity",
                text: "I adapt my texting style based on who I/'m communicating with (e.g., friends, family, colleagues).",
              },
              {
                value: "different languages/tones",
                text: "I use different languages and tones when texting with different people.",
              },
              {
                value: "proper grammar",
                text: "I prefer to use proper grammar and punctuation in my text messages.",
              },
              {
                value: "understanding abbreviations",
                text: "I'm skilled at understanding and interpreting abbreviations or shortcuts commonly used in various online communities.",
              },
              {
                value: "textese",
                text: "I use textese to inject humor and personality into my messages.",
              },
            ],
            rowTitleWidth: 400,
            columnMaxWidth: 30,
            alternateRows: true,
            isAllRowRequired: true,
          },
        ],
      },
      {
        name: "page_2",
        title: "Demographic Information",
        showQuestionNumbers: false,
        elements: [
          {
            type: "radiogroup",
            title:
              "Did you read the instructions and do you think you did the task correctly?",
            name: "instructions",
            choices: ["Yes", "No", "I was confused"],
            isRequired: true,
          },
          {
            type: "dropdown",
            title: "Gender:",
            name: "Gender",
            choices: ["Female", "Male", "Non-binary/Non-conforming", "Other"],
            isRequired: true,
          },

          {
            type: "text",
            title: "Age:",
            name: "age",
            textbox_columns: 10,
            isRequired: true,
          },
          {
            type: "dropdown",
            title: "Level of education:",
            name: "education",
            choices: [
              "Some high school",
              "Graduated high school",
              "Some college",
              "Graduated college",
              "Hold a higher degree",
            ],
            showOtherItem: true,
            isRequired: true,
          },
          {
            type: "text",
            title:
              "What was the language you spoke at home when you were growing up?",
            name: "home language",
            textbox_columns: 20,
            isRequired: true,
          },
          {
            type: "text",
            title: "What language do you speak the majority of the day?",
            name: "language",
            textbox_columns: 20,
            isRequired: true,
          },
          {
            type: "drop-down",
            title: "Did you enjoy the experiment?",
            name: "enjoy",
            options: [
              "Worse than the average experiment",
              "An average experiment",
              "Better than the average experiment",
            ],
            showOtherItem: true,
            isRequired: true,
          },
          {
            type: "text",
            title: "Do you have any other comments about this experiment?",
            name: "comments",
            textbox_columns: 30,
            textbox_rows: 4,
          },
        ],
      },
    ],
  },
};
timeline.push(post_survey);

const thanks = {
  type: jsPsychHtmlButtonResponse,
  choices: ["Continue"],
  stimulus:
    "Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back.<br><br>",
};
timeline.push(thanks);

jsPsych.run(timeline);
