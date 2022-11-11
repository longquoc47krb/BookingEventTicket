import React from "react";
import { Collapse } from "antd";
import { data } from "autoprefixer";
import { t } from "i18next";
const { Panel } = Collapse;
function TicketComponent(props) {
  const { data } = props;
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <Collapse onChange={onChange}>
      {data.map((item, index) => (
        <Panel header={item.ticketName} key={index}>
          <div className="flex justify-between w-full">
            <p>{item.price}</p>
            <p>{item.quantity}</p>
            <button className="primary-button">{t("event.book-now")}</button>
          </div>
        </Panel>
      ))}
    </Collapse>
  );
}
export default TicketComponent;
