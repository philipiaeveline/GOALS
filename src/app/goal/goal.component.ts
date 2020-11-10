import { Component, OnInit } from '@angular/core';
import { Goal } from '../goal';
import { GoalService } from '../goal-service/goal.service';
import { AlertService } from '../alert-service/alert.service';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../quote-class/quote';
import { Router } from '@angular/router';

import { QuoteRequestService } from '../quote-http/quote-request.service';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css'],
  providers: [GoalService]
}) 
export class GoalComponent  implements OnInit {
  goals: Goal[];
  alertService: AlertService;
  quote: Quote;
  http: HttpClient;
  goToUrl(id){
    this.router.navigate(['/goals',id])
  }
  deleteGoal(index){
    let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}`)

    if (toDelete){
      this.goals.splice(index,1)
      this.alertService.alertMe("Goal has been deleted")
    }
  }

  constructor(goalService:GoalService, alertService:AlertService, private quoteService:QuoteRequestService, private router:Router) {
    this.goals = goalService.getGoals()
    this.alertService = alertService;
  }

  addNewGoal(goal) {
    let goalLength = this.goals.length;
    goal.id = goalLength + 1;
    goal.completeDate = new Date(goal.completeDate)
    this.goals.push(goal)
  }
  toggleDetails(index) {
    this.goals[index].showDescription = !this.goals[index].showDescription;
  }
  completeGoal(isComplete, index) {
    if (isComplete) {
      this.goals.splice(index, 1);
    }
  }
  // deleteGoal(isComplete, index) {
  //   if (isComplete) {
  //     let toDelete = confirm(`Are you sure you want to delete ${this.goals[index].name}?`)

  //     if (toDelete) {
  //       this.goals.splice(index, 1)
  //       this.alertService.alertMe("The goal has been deleted")
  //     }
  //   }
  // }

  ngOnInit() {

    // interface ApiResponse {
    //   author: string;
    //   quote: string;

   
    // }

    // this.http.get<ApiResponse>("http://quotes.stormconsultancy.co.uk/random.json").subscribe(data => {
    //   // Succesful API request
    //   this.quote = new Quote(data.author, data.quote)
    // }, err => {
    //   this.quote = new Quote("Winston Churchill", "Never never give up!")
    //   console.log("An error occurred")
    // })
    this.quoteService.quoteRequest()
    this.quote = this.quoteService.quote
  }
}