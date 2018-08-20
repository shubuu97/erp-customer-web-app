import React from 'react';
import Table from 'react-bootstrap/lib/Table';
import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _find from 'lodash/find';


export default class ItemTable extends React.Component {
  constructor(props) {
    super(props);
    this.HTMLFields = this.props.HTMLFields;
  }

  handleItemClick(url) {
    this.props.handleItemClick(url);
  }

  handleBlockchainHistoryClick(url) {
    this.props.handleBlockchainHistoryClick(url);
  }

  getOrganisationDisplayText(organisationsLookUpData, organisationData) {
    const orgObject = [];
    let orgs = '';

    if (_isEmpty(organisationData)) { return orgs; }

    const noOfOrgs = organisationData.length;
    for (let i = 0; i < noOfOrgs; i++) {
      orgObject.push(_find(organisationsLookUpData.data, { value: organisationData[i] }));
    }
    const noOfAssignedOrg = orgObject.length;
    for (let i = 0; i < noOfAssignedOrg; i++) {
      orgs += ` ${orgObject[i].displayText}`;
    }

    return orgs;
  }

  render() {
    const itemResults = this.props.HTMLFields && this.props.HTMLFields.itemResults;

    const organisationsLookUp = this.props.HTMLFields && this.props.HTMLFields.organisations;

    const headerObject = ['Select', 'Item No', 'Item Type', 'Item Desc', 'Org Names', 'Blockchain History'];

    const tableRow = itemResults;


    return (
      <div className="container-fluid" style={{
          margin: 0,
      }}>
          <form role="form" className="row">
              <div className="col-xs-12 jumbotron" >
                <hr/>
                <div id="listView">
                 <Table striped bordered condensed hover>
                   <thead>
                    <tr>
                      {
                        headerObject.map(headerDisplayText => <th>{headerDisplayText}</th>)
                      }
                    </tr>
                   </thead>
                   <tbody>
                    {
                      _map(tableRow, (val) => {
                        const itemNumberUrl = val._links.viewItem.href;
                        const blockChainHistoryUrl = val._links.blockChainHistory.href;
                        return (
                         <tr>
                          <td>{<input type="checkbox"/>}</td>
                          <td><a onClick={this.handleItemClick.bind(this, itemNumberUrl)}>{val.itemNo}</a></td>
                          <td>{val.itemType}</td>
                          <td>{val.itemDesc}</td>
                          <td>
                            {
                              _isEmpty(this.getOrganisationDisplayText(organisationsLookUp, val.organisations)) ? '' : this.getOrganisationDisplayText(organisationsLookUp, val.organisations)
                            }
                          </td>
                          <td><a onClick={this.handleBlockchainHistoryClick.bind(this, blockChainHistoryUrl)}>View</a></td>
                         </tr>
                        );
                      })
                    }
                   </tbody>
                   </Table>
                  </div>
                 </div>
                  <div className="row">
                  </div>
              </form>
          </div>
    );
  }
}
