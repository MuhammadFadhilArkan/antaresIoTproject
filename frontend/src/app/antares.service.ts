import { Injectable,OnInit } from '@angular/core';
import { pesan,gps,gps2,pesan2 } from './antares.model';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpHeaderResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AntaresService {

  constructor(private http: HttpClient) { }
  init:pesan={rn:'init'}
  initg:gps={rn:'initt'}
  pesans:pesan[]=[this.init];
  pesangps:gps[]=[this.initg];
  historypesan:pesan[]=[];
  historygps:gps[]=[];

  getpesan(): Observable<any> {
    const headers =new HttpHeaders()
        .set('X-M2M-Origin','122d29e20b2ca3a5:d1442e06ff47f91e')
        .set('Content-Type','application/json')
        .set('Accept','application/json');

    return this.http.get(`https://platform.antares.id:8443/~/antares-cse/antares-id/blue/lorabaru/la`,{'headers':headers});
  }

  getid(){
    const headers =new HttpHeaders()
      .set('X-M2M-Origin','122d29e20b2ca3a5:d1442e06ff47f91e')
      .set('Content-Type','application/json')
      .set('Accept','application/json');

    return this.http.get(`https://platform.antares.id:8443/~/antares-cse/antares-id/blue/lorabaru?fu=1&ty=4&drt=1`,{'headers':headers});

  }

  getgpsall(idlist:String){
      const headers =new HttpHeaders()
        .set('X-M2M-Origin','122d29e20b2ca3a5:d1442e06ff47f91e')
        .set('Content-Type','application/json')
        .set('Accept','application/json');

    return this.http.get(`https://platform.antares.id:8443/~${idlist}`,{'headers':headers}); 
  }

  addhistory(Pesan:pesan){
    this.historypesan.push(Pesan)
  }
  callbackhistory(){
    return this.historypesan;
  }

  addhistorygps(Pesan:gps){
    this.historygps.push(Pesan)
  }

  callbackhistorygps(){
    return this.historygps;
  }

  pesankirim(){
    return this.pesans;
  }

  gpskirim(){
    return this.pesangps;
  }

  addpesangps(Pesan:gps){
    this.pesangps.push(Pesan);
  }

  getpesandb(){
    return this.http.get(`http://localhost:3002/message`);
  }

  getgpsdb(){
    return this.http.get(`http://localhost:3002/gps`);
  }

  postgps(Pesan:gps2){
    return this.http.post(`http://localhost:3002/gps`,Pesan);
  }

  postpesan(Pesan:pesan2){
    return this.http.post(`http://localhost:3002/message`,Pesan);
  }

  addpesan(Pesan:pesan){
    this.pesans.push(Pesan);
  }

  /*postpesan(Pesan:pesan):Observable<any>{
    const headers =new HttpHeaders()
       .set('X-M2M-Origin','122d29e20b2ca3a5:d1442e06ff47f91e')
       .set('Content-Type','application/json')
       .set('Accept','application/json');
      
    return this.http.post(`https://platform.antares.id:8443/~/antares-cse/cnt-481470069`,Pesan,{'headers':headers});  
  }*/

}
