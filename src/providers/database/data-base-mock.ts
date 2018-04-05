import { MarketModel } from "../../models/market-model";


export class DataBaseProviderMock {
private markets:Array<MarketModel>=[new MarketModel(0,"Market 1", "supermarket","Alger Centre","36.752863", "3.055910","0698393580"),
new MarketModel(1,"Market 2", "supermarket","Madania","36.740963", "3.067368","0698393580"),
new MarketModel(2,"Market 3", "shop","Kherouba","36.740963", "3.087368","0698393580")
];

constructor(){
}
getAllMarkets() :Promise<MarketModel[]>{
    return Promise.resolve(this.markets);
}

public getCurrentMarkets():Array<MarketModel>{
    return this.markets;
  }

  public addMarket(market:MarketModel): Promise<MarketModel> {
    market.marketId=this.markets.length;
    this.markets.push(market);
    return Promise.resolve(market);
    }
public getMarket(rowId):Promise<MarketModel>{
  return Promise.resolve(this.markets[rowId]);
}
}