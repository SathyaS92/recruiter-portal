import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CKEditorComponent, CKEditorModule, CKEditor5, ChangeEvent } from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-job-description',
  templateUrl: './job-description.component.html',
  styleUrls: ['./job-description.component.scss'],
  //encapsulation: ViewEncapsulation.None
  //encapsulation: ViewEncapsulation.Emulated
})
export class JobDescriptionComponent implements OnInit {


  public jobDescription:any;
  public description:string="";
  public Editor = ClassicEditor;
  public config:any;
  public touchedDescripton:Boolean=false;
  public jobDescriptionFormGroup:any;
  public afterNext:boolean=false;
  
  @Input() values:any
  
  @Output() passDataToParent: EventEmitter<any> = new EventEmitter<any>();
  @Output() screen:EventEmitter<any> = new EventEmitter<any>();

  constructor(private fb:FormBuilder){

  }

  ngOnInit(){

    let currentScreen = this.values.currentScreen;

    if(this.values.hasOwnProperty('currentScreen')){
      if(currentScreen == "Candidate Selection"){
        this.afterNext = true;
      }
      else if(currentScreen != "Candidate Selection"){
        this.afterNext = false;
      }
    }
    else{
      this.afterNext = false;
    }

    this.jobDescription = this.values;     
    this.jobDescriptionFormGroup = new FormGroup({
      jobID: new FormControl(this.values.jobID),
      jobAddedDate: new FormControl(this.values.jobAddedDate),
      customer:new FormControl(this.values.customer),
      jobDescription: new FormControl(this.values.jobDescription || '', [Validators.required, this.noWhitespaceValidator]),
      jobTitle: new FormControl(this.values.jobTitle),
      jobLocation:new FormControl(this.values.jobLocation),
      currentScreen:new FormControl(this.values.currentScreen == "Candidate Selection"? "Candidate Selection": "Job Description"),      
      isJobDescriptionUpdated:new FormControl(this.values.isJobDescriptionUpdated)
    });
//     this.config = { 
//       //allowedContent: false,
//       //forcePasteAsPlainText: true,
//       //removePlugins: 'horizontalrule,tabletools,specialchar,about,list,others',
//       removeButtons: (['InsertImage'])
// };
    // this.editorConfig = {
    //   editable: true,
    //   spellcheck: true,   
    //   enableToolbar: true,
    //   showToolbar: true,
    //   placeholder: "Enter description here...",
    //   // defaultParagraphSeparator: "",
    //   // defaultFontName: "",
    //   // defaultFontSize: "",
    //   fonts: [
    //     { class: "arial", name: "Arial" },
    //     { class: "times-new-roman", name: "Times New Roman" },
    //     { class: "calibri", name: "Calibri" },
    //     { class: "comic-sans-ms", name: "Comic Sans MS" }
    //   ],
    //   // customClasses: [
    //   //   {
    //   //     name: "quote",
    //   //     class: "quote"
    //   //   },
    //   //   {
    //   //     name: "redText",
    //   //     class: "redText"
    //   //   },
    //   //   {
    //   //     name: "titleText",
    //   //     class: "titleText",
    //   //     tag: "h1"
    //   //   }
    //   // ],
    //   // uploadUrl: "v1/image",
    //   // uploadWithCredentials: false,
    //   // sanitize: true,
    //   toolbarPosition: "top",
    //   toolbarHiddenButtons: [["bold", "italic"], ["fontSize"]]
    //   //removeButtons: 'Save,NewPage,Preview,Print,Templates,Replace,SelectAll,Form,Checkbox,Radio,TextField,Textarea,Find,Select,Button,ImageButton,HiddenField,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,CopyFormatting,CreateDiv,BidiLtr,BidiRtl,Language,Flash,Smiley,PageBreak,Iframe,Font,FontSize,TextColor,BGColor,ShowBlocks,Cut,Copy,Paste,Table,Image,Format,Source,Maximize,Styles,Anchor,SpecialChar,PasteFromWord,PasteText,Scayt,Undo,Redo,Strike,RemoveFormat,Indent,Outdent,Blockquote,Underline'
    // };
  }

  getInnerHTML(val:any){    
    return val.replace(/(<([^>]+)>)/ig,'');
  }

  public noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
}

  OnDescriptionChange(event:any){
    // alert(event);
    // console.log('EVENT DESCRIPTION', event);
    //   this.description = event 
  }

  public onChange( { editor }: ChangeEvent ) {
    this.touchedDescripton = true;
}


  OnNext(){
      // this.jobDescription.jobDescription = this.description;      
      this.passDataToParent.emit(this.jobDescriptionFormGroup.value);
      this.screen.emit("Candidates Selection");
  }
  OnPrevious(){
    if(this.touchedDescripton){
      this.jobDescriptionFormGroup.get('isJobDescriptionUpdated').patchValue(true)
    }
    
    this.passDataToParent.emit(this.jobDescriptionFormGroup.value);
    this.screen.emit("Job Details");
  }

}
