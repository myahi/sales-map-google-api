export class MarketModel {
     marketId: number;
     marketName: string;
     marketCategory: string;
     marketAddress: string;
     lat: string;
     lng: string;
     marketPhone :string;

    constructor(marketId: number,marketName: string,marketCategory: string,marketAddress: string,lat:string,lng:string,marketPhone){
        this.marketId = marketId;
        this.marketName=marketName;
        this.marketCategory=marketCategory;
        this.marketAddress=marketAddress;
        this.lat = lat;
        this.lng = lng;
        this.marketPhone = marketPhone;
    }
    toString():string{
        return "Name: " + this.marketName+", Address:" + this.marketAddress;
    }
    public equals(obj: MarketModel) : boolean {
        return this.marketId === obj.marketId
    } 
}