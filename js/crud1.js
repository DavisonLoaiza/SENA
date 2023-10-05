export class CRUD{
    #tableName = null;
    #data = null;
  constructor(tableName = undefined){
    this.#setTableName(tableName);
    this.#setData();
}
#setTableName(tableName) {
    this.#tableNamevalidate(tableName);
    this.#tableName = tableName;
}
#setData(){
    let dataRepository = this.#get(this.#tableName);
    this.#data = dataRepository === null ? [] : dataRepository;
}
#tableNamevalidate(tableName) { 
    if(tableName === undefined) throw new Error("table name required");
}
#save() {
    let dataTosave = JSON.stringify(this.#data);
    sessionStorage.setItem(this.#tableName, dataTosave);
}
#get(key){
    let data = sessionStorage.getItem(key);
    return JSON.parse(data);
}
#existsElementWithId(id){
    return this.#data[id] === undefined ? false : true;
}
#checkThatElementExistsWithId(id){
    if(!this.#existsElementWithId(id))
    throw new Error("this element not exists");
}
create(data){
    this.#data.push(data);
    this.#save();
    return this.#data.length;
}
read(id){
    return this.#data[id];
}

readAll(){
    return this.#data;
}

upade(id,data){
    this.#data[id] = data;
    this.#save();
    return true;
}

delate(id){
    this.#data.splice(id, 1);
    this.#save();
    return  true;
}
}