import { Component, DoCheck, OnInit } from '@angular/core';
import { PracticeService } from './practice.service';
import {  MatSnackBar } from '@angular/material';
// import { error, log } from 'console';
import { HomeComponent } from '../home/home.component';
import { MatDialog } from '@angular/material/dialog';
import { element } from 'protractor';

@Component({
  selector: 'app-practice-task',
  templateUrl: './practice-task.component.html',
  styleUrls: ['./practice-task.component.css']
})
export class PracticeTaskComponent implements OnInit {
  task;
  date;
  dateall:any=[]
  selectedValue:string='null';
  constructor(private service:PracticeService,private snackbr:MatSnackBar,private dialog:MatDialog) {

   }
  

  ngOnInit() {
   this.get()
  
   }
   get(){
    this.service.get().subscribe(res=>{
      console.log('get mothod',res);
      this.dateall=res
    }) 
   }
   //for adding task
  methoddcall(task,date){
    this.date=date
    this.task=task
    console.log(task.value,date.value);
    let body={
    date:date.value,
    task:task.value,
    status:false,
    editable:Boolean
   }
    this.service.post(body).subscribe(
      res=>{
      console.log('data from post',res)
      // this.updatedvalue(res)

    },
    (error)=>{
      console.error(error);
    }
    ,()=>{
    //  console.log('completed');
    this.get()   //for getting value after clicking
         date.value=''
         task.value=''
         this.snackbr.open('Task added successfully','',{
        duration:2000,
        verticalPosition:'bottom',
      
      })}
    )}
  
//for deleting task
  delete(deletedata){
  this.dateall.splice(deletedata,1)
  this.snackbr.open('Task deleted sucessfully','',{
    duration:2000
  })
//  this. remove(1)
this.service.removedate(deletedata).subscribe(data=>{

})
//  this.get();
}

//editing task
openDialog(editData)
{
  // console.log('***for open dialog',editData);
  let dialogRef= this.dialog.open(HomeComponent,{
    data :{ editData }
  });
  dialogRef.afterClosed().subscribe(res=>{
  if(res)
     {
       this.snackbr.open('Task updated sussefully','',{
             duration:1000
       });   
      // this setTimeout() used because it excute quickly before change reflected in the server
      setTimeout(() => {
        this.get();  
       }, 500);
     }
  })
  
}


onChange(toggle,task){
  //
      if(toggle.checked){
       task.status=true;
       this.service.updateTask(task).subscribe();
       this.snackbr.open('Task completed','',{
        duration:2000,
        verticalPosition:"bottom"
       })
      }
      //this toggle for the when task mark as incomplete
      else{
       task.status=false;
       this.service.updateTask(task).subscribe(res=>{
       //console.log(res);
      })
      }
      setTimeout(() => {
        this.get();  
        }, 500);
}
}