import React, { Component } from "react";
import M from "materialize-css";

export default class Autocomplete extends Component {
  render() {
    const data = {};
    this.props.data.forEach((item) => (data[item.name] = null));
    const autocomplete = document.querySelectorAll(".autocomplete");
    M.Autocomplete.init(autocomplete, {
      data: data,
      onAutocomplete: this.props.onAutocomplete,
    });

    return (
      <div className="input-field">
        <input
          type="text"
          autocomplete="off"
          name="autocomplete"
          id="autocomplete"
          value={this.props.value}
          onChange={this.props.onChange}
          className="autocomplete"
        />
        <label htmlFor="autocomplete">{this.props.label}</label>
      </div>
    );
  }
}
