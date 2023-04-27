const createInput = (state, key) => {
  const input = document.createElement('input');
  const label = document.createElement('label');
  input.setAttribute('type','radio');
  input.setAttribute('id',`radio-${key}`);
  input.setAttribute('name','radio');
  input.setAttribute('value',`${key}`);
  label.classList.add('question_label');
  label.setAttribute('for',`radio-${key}`);
  label.textContent = state.question.answers[key];
  return [input, label]
}

const renderSmallRadio = (state,elements) => {
  const options = Object.keys(state.question.answers);
  const { modalQuestions } = elements;
  modalQuestions.innerHTML = '';
  const modalQuestionLeft = document.createElement('div');
  modalQuestionLeft.classList.add('modal_questions_left');
  const modalQuestionRight = document.createElement('div');
  modalQuestionRight.classList.add('modal_question_right');
  modalQuestions.append(modalQuestionLeft);
  modalQuestions.append(modalQuestionRight);
  options.map((key) => {
    const questionRadio = document.createElement('div');
    questionRadio.classList.add('question_radio');
    const [input, label] = createInput(state, key)
    questionRadio.append(input);
    questionRadio.append(label);
    if (key % 2 === 1) {
      modalQuestionLeft.append(questionRadio);
    } else {
      modalQuestionRight.append(questionRadio);
    }
    label.addEventListener('click', (e) => {
      const value = (e.currentTarget.innerHTML);
      const key = state.question.text;
      state.currentValue = {
        key, value
      }
      elements.nextQuestion.removeAttribute('disabled');
    })
  })
}

const renderRadioBig = (state, elements) => {
  const options = Object.keys(state.question.answers);
  const { modalQuestions } = elements;
  modalQuestions.innerHTML = '';
  const questionRadioWrapper = document.createElement('div');
  questionRadioWrapper.classList.add('questions_radio_wrapper');
  options.map((key) => {
    const questionRadioBig = document.createElement('div');
    questionRadioBig.classList.add('question_radio_big');
    const [input, label] = createInput(state, key)
    questionRadioBig.append(input);
    questionRadioBig.append(label);
    modalQuestions.append(questionRadioBig)
    label.addEventListener('click', (e) => {
      const value = (e.currentTarget.innerHTML);
      const key = state.question.text;
      state.currentValue = {
        key, value
      }
      elements.nextQuestion.removeAttribute('disabled');
    })
  })
}

const renderSelect = (state, elements) => {
  const options = Object.keys(state.question.answers);
  const { modalQuestions } = elements;
  modalQuestions.innerHTML = '';
  const questionSelectWrapper = document.createElement('div');
  questionSelectWrapper.classList.add('question_select_wrapper');
  const selectHeader = document.createElement('h1');
  selectHeader.classList.add('select_header');
  selectHeader.textContent = state.question.header;
  const questionSelect = document.createElement('select');
  questionSelect.classList.add('question_select');
  questionSelect.setAttribute('name', state.question.header);
  questionSelect.setAttribute('id', state.question.header);
  options.map((key) => {
    const option = document.createElement('option');
    option.setAttribute('value', state.question.answers[key]);
    option.textContent = state.question.answers[key];
    questionSelect.append(option);
  })

  questionSelectWrapper.append(selectHeader);
  questionSelectWrapper.append(questionSelect);
  modalQuestions.append(questionSelectWrapper)

  questionSelect.addEventListener('change', function () {
    const value = this.value;
    const key = state.question.text;
    state.currentValue = {
      key, value
    }
    elements.nextQuestion.removeAttribute('disabled');
  });
}

const renderForm = (state, elements) => {
  const options = Object.keys(state.question.answers);
  const { modalQuestions } = elements;
  modalQuestions.innerHTML = '';
  const formWrapper = document.createElement('form');
  formWrapper.classList.add('form_wrapper');
  const button = document.createElement('button');
  button.classList.add('form_item', 'submit');
  button.setAttribute('type','submit');
  button.textContent = 'Получить подборку';
  const submitTextWrapper = document.createElement('div');
  submitTextWrapper.classList.add('submit_text_wrapper');
  const submitText =  document.createElement('h3');
  submitText.classList.add('submit_text');
  const personal = document.createElement('a');
  personal.classList.add('personal');
  const underline = document.createElement('u');
  underline.textContent = 'Персональных данных';
  personal.setAttribute('href', '');
  personal.append(underline);
  submitText.textContent = `Нажимая на кнопку, вы даете согласие на обработку своих`;
  submitText.append(personal)
  submitTextWrapper.append(submitText)
  options.map((key) => {
    const input = document.createElement('input');
    input.classList.add('form_item', 'input');
    input.setAttribute('placeholder', state.question.answers[key]);
    input.setAttribute('type',key);
    input.addEventListener('change', (e) => {
      state.personal[key] = e.target.value
    })
    formWrapper.append(input)
  })
  formWrapper.append(button);
  formWrapper.append(submitText);
  modalQuestions.append(formWrapper);
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const result = {
      answers: state.answers,
      personal: state.personal,
    }
  })
}

export default (state, elements, questionsList) => {
  const { modalHeaderText, modalHeaderStep } = elements;
  modalHeaderStep.innerHTML = '';
  modalHeaderText.innerHTML = '';
  modalHeaderText.append(state.question.text);
  modalHeaderStep.append(`Шаг ${state.currentId}/${questionsList}`)
  switch (state.question.type) {
    case 'radioSmall':
      elements.modalNavBtns.classList.remove('hidden')
      renderSmallRadio(state,elements)
      break;
    case 'radioBig':
      elements.modalNavBtns.classList.remove('hidden')
      renderRadioBig(state, elements)
      break;
    case 'select':
      elements.modalNavBtns.classList.remove('hidden')
      renderSelect(state, elements)
      break;
    case 'result':
      elements.modalNavBtns.classList.add('hidden')
      renderForm(state, elements)
      break;
    default:
      console.log('ошибка');
  }
}

