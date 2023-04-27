import axios from 'axios';
import fixtureQuestions from '../__fixtures__/questions.json';
import render from './render';
export default () => {
  const state = {
    question: '',
    currentId: 1,
    answers: {},
    personal: {},
    currentValue: {},
  };

  const questionsQuantity = Object.keys(fixtureQuestions).length;

  const elements = {
    nextQuestion: document.querySelector('.modal_btn_next'),
    prevQuestion: document.querySelector('.modal_btn_prev'),
    modalHeaderText: document.querySelector('.modal_header_text'),
    modalHeaderStep: document.querySelector('.modal_header_step'),
    modalQuestions: document.querySelector('.modal_questions'),
    modalNavBtns: document.querySelector('.modal_nav_btns'),
  };

  state.question = fixtureQuestions[state.currentId];
  render(state, elements, questionsQuantity);

  elements.nextQuestion.addEventListener('click', () => {
    elements.nextQuestion.setAttribute('disabled', 'true');
    if (state.currentId < questionsQuantity) {
      state.currentId += 1;
      state.question = fixtureQuestions[state.currentId];
      if (state.currentId > 1) {
        elements.prevQuestion.classList.remove('hidden')
      }
    }
    const key = state.currentValue.key;
    const value = state.currentValue.value;
    state.answers[key] = value;
    state.currentValue = {};
    render(state, elements, questionsQuantity);
    console.log(state)
  })

  elements.prevQuestion.addEventListener('click', () => {
    elements.nextQuestion.setAttribute('disabled', 'true');
    if(state.currentId > 1) {
      state.currentId -= 1;
      state.question = fixtureQuestions[state.currentId];
      if (state.currentId === 1) {
        elements.prevQuestion.classList.add('hidden')
      }
    }
    render(state, elements, questionsQuantity);
  })

  const result = {
    answers: state.answers,
    personal: state.personal,
  }
  //тут будут все результаты, которые отправятся по клику на кнопку получить подборку(валидацию персональных полей не делал)

  return result;
};
