import {filter} from 'lodash';

export const priceFilter = (list, filterObj) => {
    console.log(filter(list, (item) => item.price > 50));
    let filteredData = [];
    if(filterObj.lessThan50) {
        filter(list, (item) => item.price < 50).map((product)=>{
            filteredData.push(product);
        });
    }
    if(filterObj.from50To100) {
        filter(list, (item) => (item.price > 50 && item.price < 100)).map((product)=>{
            filteredData.push(product);
        });
    }
    if(filterObj.from100To200) {
        filter(list, (item) => (item.price > 100 && item.price < 200)).map((product)=>{
            filteredData.push(product);
        });
    }
    if(filterObj.above200) {
        filter(list, (item) => (item.price > 200)).map((product)=>{
            filteredData.push(product);
        });
    }
    if(!filterObj.lessThan50 && !filterObj.from50To100 && !filterObj.from100To200 && !filterObj.above200) {
        return list;
    }
    return filteredData;
}