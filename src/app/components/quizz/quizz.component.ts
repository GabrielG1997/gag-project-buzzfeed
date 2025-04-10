import { Component, OnInit } from '@angular/core';
import { REACTIVE_NODE } from '@angular/core/primitives/signals';
import quizz_questions from "../../../../public/assets/data/quizz_questions.json"
import { map } from 'rxjs';
type QuestionOption = {
  id: number;
  name: string;
  alias: 'front' | 'back' | 'full' | 'out';
}

type questionType = {
  id: number;
  question: string;
  options: QuestionOption[];
}

type resultType = {
  [alias in Alias]: string;
};

type questionFormatType = {
  title: string;
  question: questionType[];
  results: resultType;
}
type Alias = 'front' | 'back' | 'full' | 'out';

@Component({
  selector: 'app-quizz',
  imports: [],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})

export class QuizzComponent implements OnInit {
  title:string = ""
  questions!: questionFormatType;
  selectedQuestion!:questionType
  answers: Alias[] = [];
  answerSeleceted:string = ""

  questionIndex:number=0
  questionMaxIndex:number=0

  finished:boolean = false
  constructor(){}
  ngOnInit(): void {
    if (quizz_questions) {
      this.questions = {
        ...quizz_questions,
        question: quizz_questions.question.map(q => ({
          ...q,
          options: q.options.map(o => ({
            ...o,
            alias: o.alias as 'front' | 'back' | 'full' | 'out'
          }))
        }))
      };
  
      this.title = this.questions.title;
      this.selectedQuestion = this.questions.question[this.questionIndex];
      this.questionMaxIndex = this.questions.question.length;
    }
  }
  playerChoose(alias:Alias) {
    this.answers.push(alias)
    this.questionIndex++;
    this.selectedQuestion = this.questions.question[this.questionIndex];
    if(this.questionIndex >= this.questionMaxIndex){
      this.printResult()
    }
  }
  printResult() {
    this.finished = true;

    const counts: Record<Alias, number> = {
      front: 0,
      back: 0,
      full: 0,
      out: 0
    };

    this.answers.forEach(answer => {
      counts[answer]++;
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    const topAlias = sorted[0][0] as Alias;

    this.answerSeleceted = this.questions.results[topAlias];
  }
  nextGame() {
    alert("The game name is, let's make a connection")
    open("https://www.linkedin.com/in/gabrielalvesguimaraes/","pop-up")
    }
    restart() {
      this.finished = false
      this.answers = [];
      this.questionIndex = 0;
      this.selectedQuestion = this.questions.question[this.questionIndex];
    }
  
}
