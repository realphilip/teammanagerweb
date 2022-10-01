import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Collaborator } from './collaborator';
import { CollaboratorService } from './collaborator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'teammanagerweb'
  public collaborators: Collaborator[] = [];
  public editCollaborator: Collaborator;
  public deleteCollaborator: Collaborator;

  constructor(private collaboratorService: CollaboratorService){}
  
  ngOnInit() {
      this.getCollaborators();
  }

  public getCollaborators(): void{
    this.collaboratorService.getCollaborators().subscribe(
      (response: Collaborator[]) => {
        this.collaborators = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
      );
  }

  public onAddCollaborator(addForm: NgForm): void {
    document.getElementById('add-collaborator-form')?.click();
    this.collaboratorService.addCollaborator(addForm.value).subscribe(
      (response: Collaborator) => {
        console.log(response);
        this.getCollaborators();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }

  public onUpdateCollaborator(collaborator: Collaborator): void {
    this.collaboratorService.updateCollaborator(collaborator).subscribe(
      (response: Collaborator) => {
        console.log(response);
        this.getCollaborators();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public onDeleteCollaborator(collaboratorId: number): void {
    this.collaboratorService.deleteCollaborator(collaboratorId).subscribe(
      (response: void) => {
        console.log(response);
        this.getCollaborators();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }

  public searchCollaborators(searchKey: string): void{
    const results: Collaborator[] = [];
    for (const collaborator of this.collaborators) {
      if (collaborator.name.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
      || collaborator.email.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
      || collaborator.discord.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1
      || collaborator.role.toLowerCase().indexOf(searchKey.toLowerCase()) !== -1) {
        results.push(collaborator)
      }
    }
    this.collaborators = results;
    if (results.length === 0 || !searchKey){
      this.getCollaborators();
    }
  }
  
  public onOpenModal(collaborator: Collaborator|null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type= 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addCollaboratorModal');
    }
    if (mode == 'edit') {
      this.editCollaborator = collaborator;
      button.setAttribute('data-target', '#updateCollaboratorModal');
    }
    if (mode == 'delete') {
      this.deleteCollaborator = collaborator;
      button.setAttribute('data-target', '#deleteCollaboratorModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
