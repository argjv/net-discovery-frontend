import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DiscoveryResult } from './discoveryResult';
import { Configuration } from '../app.constants';

@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.ServerWithDiscoverApiUrl + '?ip=10.1.23.53&nm=24';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public Get = (): Observable<any> => {
        return this._http.get(this.actionUrl)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public GetAll = (): Observable<DiscoveryResult[]> => {
        return this._http.get(this.actionUrl)
            .map((response: Response) => <DiscoveryResult[]>response.json())
            .catch(this.handleError);
    }

    public GetAllForce = (): Observable<DiscoveryResult[]> => {
        return this._http.get(this.actionUrl + '&force=true')
            .map((response: Response) => <DiscoveryResult[]>response.json())
            .catch(this.handleError);
    }

    public GetSingle = (id: number): Observable<DiscoveryResult> => {
        return this._http.get(this.actionUrl + id)
            .map((response: Response) => <DiscoveryResult>response.json())
            .catch(this.handleError);
    }

    public Add = (itemName: string): Observable<DiscoveryResult> => {
        let toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers })
            .map((response: Response) => <DiscoveryResult>response.json())
            .catch(this.handleError);
    }

    public Update = (id: number, itemToUpdate: DiscoveryResult): Observable<DiscoveryResult> => {
        return this._http.put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map((response: Response) => <DiscoveryResult>response.json())
            .catch(this.handleError);
    }

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id)
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
