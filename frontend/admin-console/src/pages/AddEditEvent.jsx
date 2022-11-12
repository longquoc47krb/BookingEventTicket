/* eslint-disable quotes */
import { Col, message, Row } from "antd";
import { t } from "i18next";
import React, { useEffect, useRef, useState } from "react";
import { Header } from "../components";
import { GiCancel } from "react-icons/gi";
import UploadImage from "../components/Upload";
import { useFormik, Field, Form, FormikProvider, FieldArray } from "formik";
import * as Yup from "yup";
import { YupValidations } from "../utils/validate";
import { useFetchCategories } from "../api/services/categoryServices";
import { isEmpty } from "../utils/utils";
import {
  DatePicker,
  Input,
  Select,
  TimePicker,
} from "../components/customField";
import { encode, decode } from "js-base64";
import Editor from "./Editor";
import moment from "moment";
import constants from "../utils/constants";
import { provinces } from "../utils/provinces";
import { map, sumBy } from "lodash";
import { useParams } from "react-router-dom";
import eventServices, { useEventDetails } from "../api/services/eventServices";
import { useDispatch, useSelector } from "react-redux";
import { setInitialBackground } from "../redux/slices/eventSlice";
import { userInfoSelector } from "../redux/slices/accountSlice";
const { getEventById, createEvent, uploadEventBackground } = eventServices;
const { PATTERNS } = constants;
function AddEditEvent(props) {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();
  const user = useSelector(userInfoSelector);
  const { data: categories, status } = useFetchCategories();
  const initialValues = {
    background: eventId ? event.background : "",
    name: event?.name ?? "",
    startingDate: eventId
      ? moment(event?.startingDate, PATTERNS.DATE_FORMAT)
      : moment(),
    startingTime: eventId
      ? moment(event?.startingTime, PATTERNS.TIME_FORMAT)
      : moment(),
    endingDate: eventId
      ? moment(event?.endingDate, PATTERNS.DATE_FORMAT)
      : moment(),
    eventCategoryList: map(event?.eventCategoryList, "id") ?? [],
    endingTime: eventId
      ? moment(event?.endingTime, PATTERNS.TIME_FORMAT)
      : moment(),
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
    onSubmit: async (values) => {
      console.log(values);
      let temp = [];
      for (const element of values.eventCategoryList) {
        temp.push({ id: element });
      }
      const request = {
        name: values.name,
        description: encode(values.description),
        endingDate: moment(values.endingDate).format(PATTERNS.DATE_FORMAT),
        endingTime: moment(values.endingTime).format(PATTERNS.TIME_FORMAT),
        startingDate: moment(values.startingDate).format(PATTERNS.DATE_FORMAT),
        startingTime: moment(values.startingTime, PATTERNS.TIME_FORMAT),
        eventCategoryList: temp,
        province: values.province,
        venue: values.venue,
        venue_address: values.venue_address,
        organizationTickets: values.ticketList,
        totalTicket: sumBy(values.ticketList, "quantity"),
        remainingTicket: sumBy(values.ticketList, "quantity"),
        host_id: user.id,
      };
      var formData = new FormData();
      formData.append("file", values.background);
      console.log(formData);
      console.log(formData.get("file"));
      await uploadEventBackground(user.id, formData);
      await createEvent(user.id, request);
    },
  });
  const { handleSubmit, values, setValues } = formik;
  useEffect(() => {
    if (eventId) {
      async function fetchEvent() {
        const res = await getEventById(eventId);
        setEvent(res);
        dispatch(setInitialBackground(res.background));
        setValues({
          background: res.background,
          name: res.name,
          startingDate: moment(res.startingDate, PATTERNS.DATE_FORMAT),
          startingTime: moment(res.startingTime, PATTERNS.TIME_FORMAT),
          endingDate: moment(res.endingDate, PATTERNS.DATE_FORMAT),
          eventCategoryList: map(res.eventCategoryList, "id"),
          endingTime: moment(res.endingTime, PATTERNS.TIME_FORMAT),
          description: decode(res.description),
          province: res.province,
          venue: res.venue,
          venue_address: res.venue_address,
          ticketList: res.organizationTickets,
        });
      }
      fetchEvent();
    }
  }, []);
  // convert [id1, id2, ...] format to [{id: id1}, {id: id2},...] format
  // let temp = [];
  // for (const element of values.eventCategoryList) {
  //   temp.push({ id: element });
  // }

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category={eventId ? t("event.edit") : t("event.create")}
        title={t("sider.event")}
      />
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
            <Row gutter={[8, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={20}>
                <Field
                  name="startingDate"
                  component={DatePicker}
                  label={t("event.startingDate")}
                />
              </Col>
              <Col span={4}>
                <Field
                  name="startingTime"
                  component={TimePicker}
                  label={t("event.startingTime")}
                />
              </Col>
            </Row>
            <Row gutter={[8, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={20}>
                <Field
                  name="endingDate"
                  component={DatePicker}
                  label={t("event.endingDate")}
                />
              </Col>
              <Col span={4}>
                <Field
                  name="endingTime"
                  component={TimePicker}
                  label={t("event.endingTime")}
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
                      <>
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
                              type="number"
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
                              <button
                                type="button"
                                onClick={() => remove(index)}
                              >
                                <GiCancel className="text-red-600 translate-y-[3rem] text-2xl" />
                              </button>
                            )}
                          </Col>
                        </Row>
                        <Row gutter={[8, 24]}>
                          <Col span={24}>
                            <Field
                              name={`ticketList[${index}].description`}
                              component={Input}
                              label={t("event.ticketList.description", {
                                val: index + 1,
                              })}
                            />
                          </Col>
                        </Row>
                      </>
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

export default AddEditEvent;
