import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import "moment/locale/fr";

class TableBody extends Component {
  getContent(item, header) {
    if (header.type === "date") {
      const date = _.get(item, header.path);
      console.log(date);

      const dateFr = moment(date).format("LLLL");
      return dateFr;
    }
    return _.get(item, header.path);
  }
  render() {
    const { items, headers, type } = this.props;
    return (
      <tbody>
        {items.map(item => {
          return (
            <tr key={item._id}>
              {headers.map(header => {
                return (
                  <td key={header.path}>
                    {header.content
                      ? header.content(item)
                      : this.getContent(item, header)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    );
  }
}

export default TableBody;
