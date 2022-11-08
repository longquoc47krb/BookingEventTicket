/* eslint-disable quotes */
import { Col, message, Row } from "antd";
import { t } from "i18next";
import React, { useState } from "react";
import { Header } from "../components";
import { GiCancel } from "react-icons/gi";
import UploadImage from "../components/Upload";
import { useFormik, Field, Form, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { YupValidations } from "../utils/validate";
import { useFetchCategories } from "../api/services/categoryServices";
import { isEmpty } from "../utils/utils";
import { DatePicker, Input, Select } from "../components/customField";
import { encode, decode } from "js-base64";
import Editor from "./Editor";
import moment from "moment";
import constants from "../utils/constants";
import { provinces } from "../utils/provinces";
import { map } from "lodash";
const { PATTERNS } = constants;
function AddEvent(props) {
  const { event } = props;
  const { data: categories, status } = useFetchCategories();
  const initialValues = {
    background: event?.background ?? "",
    name: event?.name ?? "",
    startingDate: event?.endingDate
      ? moment(event.startingDate, PATTERNS.DATE_FORMAT)
      : moment(),
    startingTime: "",
    endingDate: event?.endingDate
      ? moment(event.endingDate, PATTERNS.DATE_FORMAT)
      : moment(),
    eventCategoryList: map(event?.eventCategoryList, "id") ?? [],
    endingTime: event?.endingTime ?? "",
    description: event?.description ?? "",
    province: event?.province ?? "",
    venue: event?.venue ?? "",
    venue_address: event?.venue_address ?? "",
    ticketList: event?.organizationTickets ?? [
      {
        currency: "",
        price: 0,
        quantity: 0,
        ticketName: "",
      },
    ],
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      startingDate: YupValidations.startingDate,
      eventCategoryList: YupValidations.categories,
      endingDate: YupValidations.endingDate,
      description: YupValidations.name,
      venue: YupValidations.name,
      venue_address: YupValidations.name,
      ticketList: YupValidations.ticketList,
    }),
    onSubmit: async (values) => {},
  });
  const { handleSubmit, values } = formik;
  console.log("formik: ", values);
  // convert [id1, id2, ...] format to [{id: id1}, {id: id2},...] format
  let temp = [];
  for (const element of values.eventCategoryList) {
    temp.push({ id: element });
  }
  console.log("temp: ", temp);
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category={t("event.create")} title={t("sider.event")} />
      <div>
        <FormikProvider value={formik}>
          <Form
            style={{
              width: "100%",
            }}
            onSubmit={handleSubmit}
          >
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={24}>
                <Field
                  name="background"
                  component={UploadImage}
                  label={t("event.background")}
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={24}>
                <Field name="name" component={Input} label={t("event.name")} />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={24}>
                <Field
                  name="eventCategoryList"
                  component={Select}
                  mode="tags"
                  label={t("event.category")}
                  options={Object.values(
                    status === "success" ? categories : []
                  ).map((field) => ({
                    value: field.id,
                    name: t(field.name),
                  }))}
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={24}>
                <Field
                  name="startingDate"
                  component={DatePicker}
                  label={t("event.startingDate")}
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={24}>
                <Field
                  name="endingDate"
                  component={DatePicker}
                  label={t("event.endingDate")}
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={12}>
                <Field
                  name="province"
                  component={Select}
                  label={t("event.province")}
                  options={Object.values(provinces).map((field) => ({
                    value: field.name,
                    name: field.name,
                  }))}
                />
              </Col>
              <Col span={12}>
                <Field
                  name="venue"
                  component={Input}
                  label={t("event.venue")}
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={24}>
                <Field
                  name="venue_address"
                  component={Input}
                  label={t("event.venue_address")}
                />
              </Col>
            </Row>
            <FieldArray name="ticketList">
              {(fieldArrayProps) => {
                const { push, remove, form } = fieldArrayProps;
                const { values } = form;
                const { ticketList } = values;

                return (
                  <>
                    <Row gutter={[8, 40]}>
                      <Col span={24}>
                        <button
                          className="primary-button self-start w-64"
                          onClick={() =>
                            push({
                              currency: "",
                              price: 0,
                              quantity: 0,
                              ticketName: "",
                            })
                          }
                        >
                          New ticket
                        </button>
                      </Col>
                    </Row>
                    {values.ticketList?.map((_, index) => (
                      <Row gutter={[8, 24]} className="flex items-start">
                        <Col span={10}>
                          <Field
                            name={`ticketList[${index}].ticketName`}
                            component={Input}
                            label={t("event.ticketList.ticketName", {
                              val: index + 1,
                            })}
                          />
                        </Col>
                        <Col span={4}>
                          <Field
                            name={`ticketList[${index}].price`}
                            component={Input}
                            label={t("event.ticketList.price", {
                              val: index + 1,
                            })}
                          />
                        </Col>
                        <Col span={3}>
                          <Field
                            name={`ticketList[${index}].quantity`}
                            component={Input}
                            label={t("event.ticketList.quantity", {
                              val: index + 1,
                            })}
                          />
                        </Col>
                        <Col span={3}>
                          <Field
                            name={`ticketList[${index}].currency`}
                            component={Select}
                            label={t("event.ticketList.currency", {
                              val: index + 1,
                            })}
                            options={Object.values([
                              { value: "USD", label: "USD - $" },
                              { value: "VND", label: "VND - ₫" },
                            ]).map((field) => ({
                              value: field.value,
                              name: field.label,
                            }))}
                          />
                        </Col>
                        <Col span={4}>
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              <GiCancel className="text-red-600 translate-y-[3rem] text-2xl" />
                            </button>
                          )}
                        </Col>
                      </Row>
                    ))}
                  </>
                );
              }}
            </FieldArray>
            <Row gutter={[48, 40]}>
              <Col span={24}>
                <Field
                  component={Editor}
                  label={t("event.description")}
                  name="description"
                  required
                />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ marginTop: "1rem" }}>
              <Col span={24}>
                <button className="primary-button" type="submit">
                  {t("submit")}
                </button>
              </Col>
            </Row>
          </Form>
        </FormikProvider>
      </div>
    </div>
  );
}

export default AddEvent;
