import React, { Fragment, useEffect, useState } from "react";
import TextInput from "../../controls/TextInput";
import {
  getClientSettings,
  getPartnerSettings,
  saveClientSettings,
  savePartnerSettings,
} from "../../../actions/settingActions";
import M from "materialize-css";

export const Settings = (props) => {
  const [clientSettings, setClientSettings] = useState({});
  const [partnerSettings, setPartnerSettings] = useState({});
  const [clientReadOnly, setClientReadOnly] = useState(false);
  const [partnerReadOnly, setPartnerReadOnly] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const tabs = document.querySelectorAll(".tabs");
      M.Tabs.init(tabs, {});
      const clientData = await getClientSettings();
      const partnerData = await getPartnerSettings();
      if (clientData) setClientSettings(clientData);
      if (partnerData) setPartnerSettings(partnerData);
    };
    fetch();
  }, [props]);

  const handleClientSave = async () => {
    const result = await saveClientSettings(clientSettings);
    if (result) setClientSettings(result);
  };

  const handlePartnerSave = async () => {
    const result = await savePartnerSettings(partnerSettings);
    if (result) setPartnerSettings(result);
  };

  const handleClientChange = (e) => {
    setClientSettings({ ...clientSettings, [e.target.name]: e.target.value });
  };

  const handlePartnerChange = (e) => {
    setPartnerSettings({ ...partnerSettings, [e.target.name]: e.target.value });
  };

  return (
    <Fragment>
      <div className="row">
        <div className="col s12">
          <ul className="tabs">
            <li className="tab col s3">
              <a href="#client">Client Settings</a>
            </li>
            <li className="tab col s3">
              <a href="#partner">Partner Settings</a>
            </li>
          </ul>
        </div>
        <div id="client" className="col s12">
          <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
            <div>
              <h5>Initial Charge</h5>
              <TextInput
                name="indexingAndCataloging"
                label="Indexing and Cataloging"
                readOnly={clientReadOnly}
                value={clientSettings.indexingAndCataloging}
                onChange={handleClientChange}
              />
              <TextInput
                name="barcodedBoxes"
                label="Barcoded Boxes"
                readOnly={clientReadOnly}
                value={clientSettings.barcodedBoxes}
                onChange={handleClientChange}
              />
              <TextInput
                name="initialCollection"
                label="Initial Collection"
                readOnly={clientReadOnly}
                value={clientSettings.initialCollection}
                onChange={handleClientChange}
              />
              <h5>Monthly Storage Charges</h5>
              <TextInput
                name="lessThanTen"
                label="< 10K"
                readOnly={clientReadOnly}
                value={clientSettings.lessThanTen}
                onChange={handleClientChange}
              />
              <TextInput
                name="tenToTwentyFive"
                label="10K - 25K"
                readOnly={clientReadOnly}
                value={clientSettings.tenToTwentyFive}
                onChange={handleClientChange}
              />
              <TextInput
                name="moreThanTwentyFive"
                label="> 25K"
                readOnly={clientReadOnly}
                value={clientSettings.moreThanTwentyFive}
                onChange={handleClientChange}
              />
              <h5>Request Charges</h5>
              <TextInput
                name="retreivalCollection"
                label="Retreival / Collection"
                readOnly={clientReadOnly}
                value={clientSettings.retreivalCollection}
                onChange={handleClientChange}
              />
              <h5>Transportation Charges</h5>
              <TextInput
                name="urget"
                label="Urget"
                readOnly={clientReadOnly}
                value={clientSettings.urgent}
                onChange={handleClientChange}
              />
              <TextInput
                name="normal"
                label="Normal"
                readOnly={clientReadOnly}
                value={clientSettings.normal}
                onChange={handleClientChange}
              />
            </div>
            <div>
              <button
                className="btn blue mr-1"
                onClick={() => setClientReadOnly(!clientReadOnly)}
              >
                Edit
                <i className="fa fa-pencil fa-2x ml-1" />
              </button>
              <button className="btn green mr-1" onClick={handleClientSave}>
                Save
                <i className="fa fa-floppy-o fa-2x ml-1" />
              </button>
            </div>
          </div>
        </div>
        <div id="partner" className="col s12">
          <div style={{ display: "grid", gridTemplateColumns: "3fr 1fr" }}>
            <div>
              <h5>Initial Charge</h5>
              <TextInput
                name="indexingAndCataloging"
                label="Indexing and Cataloging"
                readOnly={partnerReadOnly}
                value={partnerSettings.indexingAndCataloging}
                onChange={handlePartnerChange}
              />
              <TextInput
                name="barcodedBoxes"
                label="Barcoded Boxes"
                readOnly={partnerReadOnly}
                value={partnerSettings.barcodedBoxes}
                onChange={handlePartnerChange}
              />
              <TextInput
                name="initialCollection"
                label="Initial Collection"
                readOnly={partnerReadOnly}
                value={partnerSettings.initialCollection}
                onChange={handlePartnerChange}
              />
              <h5>Monthly Storage Charges</h5>
              <TextInput
                name="lessThanTen"
                label="< 10K"
                readOnly={partnerReadOnly}
                value={partnerSettings.lessThanTen}
                onChange={handlePartnerChange}
              />
              <TextInput
                name="tenToTwentyFive"
                label="10K - 25K"
                readOnly={partnerReadOnly}
                value={partnerSettings.tenToTwentyFive}
                onChange={handlePartnerChange}
              />
              <TextInput
                name="moreThanTwentyFive"
                label="> 25K"
                readOnly={partnerReadOnly}
                value={partnerSettings.moreThanTwentyFive}
                onChange={handlePartnerChange}
              />
              <h5>Request Charges</h5>
              <TextInput
                name="retreivalCollection"
                label="Retreival / Collection"
                readOnly={partnerReadOnly}
                value={partnerSettings.retreivalCollection}
                onChange={handlePartnerChange}
              />
              <h5>Transportation Charges</h5>
              <TextInput
                name="urget"
                label="Urget"
                readOnly={partnerReadOnly}
                value={partnerSettings.urgent}
                onChange={handlePartnerChange}
              />
              <TextInput
                name="normal"
                label="Normal"
                readOnly={partnerReadOnly}
                value={partnerSettings.normal}
                onChange={handlePartnerChange}
              />
            </div>
            <div>
              <button
                className="btn blue mr-1"
                onClick={() => setPartnerReadOnly(!partnerReadOnly)}
              >
                Edit
                <i className="fa fa-pencil fa-2x ml-1" />
              </button>
              <button className="btn green mr-1" onClick={handlePartnerSave}>
                Save
                <i className="fa fa-floppy-o fa-2x ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Settings;
