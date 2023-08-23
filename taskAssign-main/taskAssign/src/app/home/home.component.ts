import { Component, OnInit } from '@angular/core';
import { PracticeService } from '../practice-task/practice.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent   {
//
myDate:any='2022-2-15';
myData:any=[];
constructor(private taskService:PracticeService, @Inject(MAT_DIALOG_DATA) public data: any,
private ref: MatDialogRef<HomeComponent>){ }

ngOnInit() {
  
  this.myData = this.data.editData;
  let temp = new Date(this.data.editData.date);
  this.myDate  = (temp.getFullYear())+'-'+(this.editDate(temp.getMonth()+1))+'-'+(this.editDate(temp.getDate())); 
}
//this function is for the if date or month < 10 then then add 0 before the given date or month
editDate(date){
  if (date<10) {
      return '0'+date;
  }
  return date;
}
// this event method execute after click on edit of the edit dialog 
editData(editTask, editDate){
  this.myData.task = editTask;
  this.myData.date = editDate;
  this.taskService.updateTask(this.myData).subscribe(res=>{
  })
  
}
}
