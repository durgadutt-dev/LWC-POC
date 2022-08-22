import { LightningElement, api, track } from "lwc";

const columns = [
    { label: 'Product', 
      fieldName: 'Name', 
      cellAttributes: {
            class: { fieldName: 'format' }
      }
    }
];

export default class Child extends LightningElement {
  @api data       = [];
  @track records  = [];
  columns         = columns;
  searchKey       = '';

  connectedCallback(){
    this.records = this.formatRecords(this.data);
  }

  // returns formatted records as needed.
  formatRecords(data){
    return JSON.parse(JSON.stringify(data));
  }


  // Dispatches updated records in parent component.
  updateData(data){
    console.log(data); // Update Omniscript data
  }

  // Filter records by Name from the search key.
  filterRecords(records, searchKey){
    if(!searchKey)
      return records.map(record => ({...record,IsHidden: false}));
    
    const lowerSearchKey  = searchKey.toLowerCase();
    for (const record of records) {
          record.IsHidden = !record.Name.toLowerCase().includes(lowerSearchKey);
    }
    return records;
  }

  handleSearch(event){
    this.searchKey    = event.detail.value;
    this.records      = this.filterRecords(this.records, this.searchKey);
  }

  // Handles selection/deselection for all the records
  handleAllSelection(event){
    this.records = this.records.map(record => ({...record, IsSelected: event.target.checked}));
    this.updateData(this.records);
  }

  // Handle single record selection
  handleRecordSelection(event){
    if (!event.target.classList.contains('record-item'))
      return;
    
    const recordId = event.target.dataset.recordId;
    const record   = this.records.find(record => record.Id == recordId);
    if (!record) return;
    record.IsSelected = event.target.checked;
    this.updateData(this.records);

    const allCB       = this.template.querySelector('.select-all');
    const selectCount = this.records.filter(record=>record.IsSelected).length;

    // Mark Select All checkbox checked if all the records are selected.
    if (event.target.checked && selectCount == this.records.length){
          allCB.checked = true;
          return;
    } 
    allCB.checked = false;
  }
}
