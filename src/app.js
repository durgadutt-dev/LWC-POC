import { LightningElement } from "lwc";

export default class App extends LightningElement {
  data = [
      {
        "Name": "First",
        "IsSelected": true,
        "IsNew": false,
        "Id": "130936"
      },
      {
        "Name": "Second",
        "IsSelected": false,
        "IsNew": true,
        "Id": "132436"
      },
      {
        "Name": "Third",
        "IsSelected": false,
        "IsNew": true,
        "Id": "13243766"
      }
    ];

  handleSelect(event)
  {
    // Update Omniscript
  }
}
