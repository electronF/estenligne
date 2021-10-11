import { Component } from 'react'

import CapturedItem from '../captureditem/CapturedItem';

import close from "./../../../wwwroot/images/times_white.png";
import camera from "./../../../wwwroot/images/camera_p.png";
import pauseCircular from "./../../../wwwroot/images/pause_circular.png";
import play from "./../../../wwwroot/images/play.png";
import stopCircular from "./../../../wwwroot/images/stop_circular.png";
import record from "./../../../wwwroot/images/record_circular.png";
import microphone from "./../../../wwwroot/images/microphone.png";
import mutedMicrophone from "./../../../wwwroot/images/muted_microphone.png"
import video from "./../../../wwwroot/images/video_white.png"
import videoDeactivate from "./../../../wwwroot/images/video_deactivate.png"

import { seconds2Time } from '../utils/functions';

import "./RenderFileZone.css"

class RenderFileZone extends Component {
    props:any = this.props 
    player:HTMLVideoElement = document.createElement("video")
    mediaRecorder:MediaRecorder|null = null
    _intervalId:any = -1
    _recordedItem:Item[] = [] 
    width = 0
    height = 0
    recordPermissionIsAccepted = false
    constraints = {
      video: true,
      audio: true
    }
    videoTrack:any 
    audioTrack:any
    context:CanvasRenderingContext2D|null = null
    _selectedFiles:Blob[]|File[] = [] 
    _displayVideoInterval:any = -1
    _state = {
      isRecording: false,
      recordIsStopped: true,
      microphoneIsMuted: true,
      cameraIsEnabled: false,
      recordPageIsDisplayed: true,
      timeCounter: 0,
      imageIsDisplayed: false,
      videoIsDisplayed: false,
      audioIsDisplayed: false,
      documentIsDisplayed: false,
      recordPermissionIsGranted: false,
      title: "File displayer",
      recordedItems: this._recordedItem,
      currentSelectedItemId: "",
      selectedFiles: this._selectedFiles,
      currentSrc: ""
    }

    state = this._state

    closeRenderZone = (event:any) => {
        try {
          
          this.videoTrack.stop()
          this.audioTrack.stop()
          this.player.srcObject = null
 
        } catch (error) {
          
        }
        this.setState(this._state)

        var renderZone = document.getElementById("display-media-box")
        renderZone?.style.setProperty("display", "none")
    }

    recordPauseVideo = (event:any) =>
    {
      var isRecording = !this.state.isRecording
      if(isRecording && this._intervalId === -1 && this.state.recordIsStopped)
      {
        this.mediaRecorder?.start()
      }
      else if(isRecording === false )
      {
        var div = document.getElementById("record-icon")
        div?.style.setProperty("opacity", "1")
        this.setState({title: "Record is in pause"})
      }
      else
        this.setState({title: "Recording..."})
      this.setState({isRecording})
    }

    stopRecordVideo = (event: any, save=true) => {
      this.mediaRecorder?.stop()
      
    }

    mutedDemuteMicrophone = (event:any) =>
    {
      try {
        this.audioTrack.enabled = this.state.microphoneIsMuted
        var microphoneIsMuted = !this.state.microphoneIsMuted
        this.setState({microphoneIsMuted})
      } catch (error) {}
     
    }

    enableDisableCamera = (event:any) =>
    {
      var cameraIsEnabled = !this.state.cameraIsEnabled
      try {
        this.videoTrack.enabled = cameraIsEnabled   
        this.setState({cameraIsEnabled})     
      } catch (error) {
      }
      
    }

    dataURLtoFile= (dataurl:string, filename:string) => {
 
      var arr:any = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
      //fc var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
  }

    takePhoto = (event:any) => 
    {
      var canvas = document.getElementById("render-zone-canvas") as HTMLCanvasElement
      var imagebase64data = canvas.toDataURL("image/png");  
      //ff imagebase64data = imagebase64data.replace('data:image/png;base64,', '');
      var photo = this.dataURLtoFile(imagebase64data, `$IMG-${new Date().toISOString()}.png`) 
      
      var selectedFiles = [...this.state.selectedFiles]
      selectedFiles.push(photo)
      var fileSrc = URL.createObjectURL(photo)
      this.setState({selectedFiles})
      this.addItemToRecordedList(photo.name, "image", photo.size, fileSrc)
    }

    countTime = () =>
    {
      if(this.state.isRecording)
      {      
        var timeCounter = this.state.timeCounter + 1
        this.setState({timeCounter})

        var div = document.getElementById("record-icon")
        if(div?.style.opacity === "1")
        {
          div?.style.setProperty("transition", "opacity ease-out .5s")
          div?.style.setProperty("opacity", "0")
        }
        else
        {
          div?.style.setProperty("transition", "opacity ease-in .5s")
          div?.style.setProperty("opacity", "1")
        }
        
      }
    }

    onMouseEnter = () =>
    {
      console.log("super")
    }

    onMouseLeave = () =>
    {
      console.log("okey")
    }

    removeItemToRecordedList = (fileId:string) => 
    {
      var item = this.state.recordedItems.find((_item)=>_item.fileId === fileId)
      var recordedItems = [...this.state.recordedItems.filter((_item)=> _item.fileId !== fileId)]
      
      if(item?.fileId === this.state.currentSelectedItemId)
        this.setState({recordedItems, recordPageIsDisplayed: true})  
      else
        this.setState({recordedItems})
    } 

    displaySelectedItem = (fileId:string) =>
    {
      var item = this.state.recordedItems.find((_item)=>_item.fileId === fileId)
      var namePart:any = item?.fileName.split('/')
      var title:any = namePart[namePart?.length - 1]
      
      this.setState({currentSrc: item?.fileSrc})
      try {
        this.videoTrack.enabled = false
        this.audioTrack.enabled = false 
      } catch (error) {
        
      }
      //Search type of file to display
      if(item?.fileType.toLocaleLowerCase() === "image")
        this.setState({
          imageIsDisplayed:true, 
          audioIsDisplayed: false, 
          videoIsDisplayed:false, 
          documentIsDisplayed:false
        })
      else if(item?.fileType.toLocaleLowerCase() === "audio")
        this.setState({
          imageIsDisplayed:false, 
          audioIsDisplayed: true, 
          videoIsDisplayed:false, 
          documentIsDisplayed:false
        })
      else if(item?.fileType.toLocaleLowerCase() === "video")
        this.setState({
          imageIsDisplayed:false, 
          audioIsDisplayed: false, 
          videoIsDisplayed:true, 
          documentIsDisplayed:false
        })
      else if(item?.fileType.toLocaleLowerCase() === "document")
        this.setState({
          imageIsDisplayed:false, 
          audioIsDisplayed: false, 
          videoIsDisplayed:false, 
          documentIsDisplayed:true
        })
      else
        this.setState({
          imageIsDisplayed:false, 
          audioIsDisplayed: false, 
          videoIsDisplayed:false, 
          documentIsDisplayed:false
        })

      this.setState({recordPageIsDisplayed:false, currentSelectedItemId:item?.fileId, title:(title===undefined)?"File displayer":title})
    }

    addItemToRecordedList = (fileName:string, fileType:string, fileSize:number, fileSrc:string="", fileSrcImage:string="") => 
    {
        var recordedItems:Item[] = []
        var item:Item = {
          fileId: ""+Math.random()+fileName,
          fileName: fileName,
          fileType: fileType,
          fileSize: fileSize,
          fileSrc: fileSrc,
          fileSrcImage: fileSrcImage
        } 

        recordedItems.push(item)
        recordedItems.push(...this.state.recordedItems)
        this.setState({recordedItems})
    }

    onPressDisplayMenuButton = (event:any) =>
    {
      try 
      {
        this.videoTrack.enabled = this.state.cameraIsEnabled
        this.audioTrack.enabled = !this.state.microphoneIsMuted        
      } catch (error) {}
  
      this.setState({recordPageIsDisplayed:true, title:"File displayer"})
    }

    playNotificationSound() {
      // var audio = document.createElement("audio")
      // audio.src = require("./../../../wwwroot/audios/notification.wav")?.default
      // audio.load()
      // audio.play()
    }

    componentDidMount = () =>
    {
      var div = document.getElementById("render-zone-menu")
      this.width = div?.clientWidth??this.width
      this.height = div?.clientHeight??this.height

      
      this.player.setAttribute("autoplay", "true")
      this.player.setAttribute("controls", "true")

      navigator.mediaDevices.getUserMedia(this.constraints)
      .then((stream) => {


        this.videoTrack = stream.getVideoTracks()[0]
        this.videoTrack.enabled = this.state.cameraIsEnabled
        
        this.audioTrack = stream.getAudioTracks()[0]
        this.audioTrack.enabled = !this.state.microphoneIsMuted
        
        this.player.srcObject = stream
        
        const options = {mimeType: 'video/webm'};
        const recordedChunks:any[] = []
        
        var canvas = document.getElementById("render-zone-canvas") as HTMLCanvasElement

        this.mediaRecorder = new MediaRecorder(stream, options)
        
        //On data available
        this.mediaRecorder.ondataavailable = (event) =>{
            if(event.data.size>0 && this.state.isRecording)
              recordedChunks.push(event.data)
        }

        //On start
        var fileSrcImage="";
        this.mediaRecorder.onstart = (event) =>{  
            this.playNotificationSound()
            while(recordedChunks.length > 0) recordedChunks.pop()
            fileSrcImage = URL.createObjectURL(this.dataURLtoFile(canvas.toDataURL("image/png"), "file.png"))
            this.setState({recordIsStopped: false, isRecording:true, title: "Recording..."})
            this._intervalId = setInterval(()=> this.countTime(), 1000)
        }
        
        //On stop
        this.mediaRecorder.onstop = (event) =>{
          const file = new Blob(recordedChunks, {type: "video/webm"})
          const selectedFiles = [...this.state.selectedFiles]
          selectedFiles.push(file)

          //Stop counter
          clearInterval(this._intervalId)
          this._intervalId = -1

          //Set opacity of record icon to 1 because it can be 0
          var _div = document.getElementById("record-icon")
          _div?.style.setProperty("opacity", "1")
          
          if(this.state.recordIsStopped === false)
            this.addItemToRecordedList("aaa.webm", "video", file.size, URL.createObjectURL(file), fileSrcImage)

          this.setState({selectedFiles, isRecording:false, timeCounter:0, recordIsStopped:true, title:"File displayer"})
        }
        
        this._displayVideoInterval = setInterval(()=>{
                        try {
                          this.context?.scale(-1, 1); 
                          this.context?.drawImage(this.player, 0, 0, -1*canvas.width, canvas.height);
                        } catch (error) {
                          clearInterval(this._displayVideoInterval)
                        }
                        
                      }, 1000/60)

        this.setState({recordPermissionIsGranted:true})
      });

      // this.addItemToRecordedList("ovi&mbouendeu.mp4", "video", 1024*1024+27364)
    }

    componentDidUpdate = () => {
          var canvas = document.getElementById("render-zone-canvas") as HTMLCanvasElement
          this.context = canvas?.getContext('2d');
    }

    render() {
        var capturedItems = this.state.recordedItems.map((item) => <CapturedItem 
        fileName = {item.fileName} 
        fileType = {item.fileType}
        fileSize = {item.fileSize}
        fileSrc = {(item.fileType==="video")?item.fileSrcImage:item.fileSrc} 
        removeItem = {() => this.removeItemToRecordedList(item.fileId??"")}
        key = {(new Date()).getTime() + Math.random() + "field"}
        displayMedia = {
            () => this.displaySelectedItem(item.fileId??"")
        }/>)
        
        return (
            <div id = "display-media-box">
                <div id = "render-zone">
                  <div id = "render-zone-title-bar"><span>{this.state.title}</span> <img src={close} alt="close" onClick={this.closeRenderZone} /></div>
                  <div className="render-zone-body">
                    <div className="render-zone-display">
                        {(this.state.recordPageIsDisplayed)?(<div className="render-record-time">
                            <div className="record-icon"> <div id="record-icon"></div> </div>
                            <span className="record-time">{seconds2Time(this.state.timeCounter)}</span>
                        </div>):null}
                        
                        {(this.state.recordPageIsDisplayed)?<canvas id="render-zone-canvas" className="render-zone-canvas" >
                        </canvas>:null}
                        {((!this.state.recordPageIsDisplayed)?((this.state.imageIsDisplayed)?
                            (<img src={this.state.currentSrc} className="render-zone-canvas" alt="display" />):
                            (<video className="render-zone-canvas" controls>
                                <source src={this.state.currentSrc} />
                            </video>)):null)} 
                        {(this.state.recordPageIsDisplayed)?
                        (<div className="render-zone-menu" id="render-zone-menu" onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                            <img src={(this.state.microphoneIsMuted)?mutedMicrophone:microphone} alt="" onClick = {this.mutedDemuteMicrophone} />
                            <img src={(this.state.cameraIsEnabled)?video:videoDeactivate} alt="" onClick = {this.enableDisableCamera} />
                            
                            <img src={(this.state.recordIsStopped)?(record):((this.state.isRecording)?pauseCircular:play)} onClick = {this.recordPauseVideo} alt="start-pause" />
                            <img  src={stopCircular} onClick = {this.stopRecordVideo} alt="stop" />
                            <img src={camera} onClick = {this.takePhoto} alt="take pic" />
                        </div>):null}

                        {(!this.state.recordPageIsDisplayed)?(<div className="display-menu-button" onClick={this.onPressDisplayMenuButton} >
                            <span>{"<"}</span>
                            <span>Back</span>
                        </div>):null}
                    </div>
                    <div className="file-manager-sender">
                      <div className="file-manager" id="file-manager">
                          {capturedItems}
                      </div>
                      <div className="file-send-zone">
                        <button>Select</button>
                        <button onClick={this.closeRenderZone}>Quit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

interface Item
{
  fileId?:string
  fileName: string,
  fileType: string,
  fileSrc?: string, 
  fileSrcImage?: string
  fileSize: number
}

export default RenderFileZone