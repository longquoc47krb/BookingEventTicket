/* eslint-disable quotes */
import { Col, Row } from "antd";
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import { t } from "i18next";
import { decode, encode } from "js-base64";
import { map, sumBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFetchCategories } from "../api/services/categoryServices";
import eventServices from "../api/services/eventServices";
import { Header } from "../components";
import { AlertErrorPopup, AlertPopup } from "../components/Alert";
import {
  DatePicker,
  Input,
  Select,
  SelectHorizonal,
  TimePicker,
} from "../components/customField";
import UploadImage from "../components/Upload";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { setInitialBackground } from "../redux/slices/eventSlice";
import constants from "../utils/constants";
import { provinces } from "../utils/provinces";
import { generateId } from "../utils/utils";
import { YupValidations } from "../utils/validate";
import Editor from "./Editor";
const { getEventById, createEvent, uploadEventBackground, updateEvent } =
  eventServices;
const { PATTERNS } = constants;
function AddEditEvent(props) {
  const { eventId } = useParams();
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format(PATTERNS.DATE_FORMAT));
  const user = useSelector(userInfoSelector);
  const { data: categories, status } = useFetchCategories();
  const initialValues = {
    background: eventId ? event.background : null,
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
    currency: event?.organizationTickets?.currency ?? "USD",
    venue: event?.venue ?? "",
    venue_address: event?.venue_address ?? "",
    ticketList: event?.organizationTickets ?? [
      {
        id: generateId(user.name, date),
        currency: "USD",
        price: 0,
        quantity: 0,
        ticketName: "",
      },
    ],
  };
  const handleEventCategoryList = (list) => {
    let temp = [];
    for (const element of list) {
      temp.push({ id: element });
    }
    return temp;
  };

  const handleFormData = (value) => {
    var formData = new FormData();
    formData.append("file", value);
    return formData;
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      startingDate: YupValidations.startingDate,
      eventCategoryList: YupValidations.categories,
      endingDate: YupValidations.endingDate,
      description: YupValidations.description,
      venue: YupValidations.venue,
      province: YupValidations.province,
      venue_address: YupValidations.address,
      ticketList: YupValidations.ticketList,
    }),
    onSubmit: async (values) => {
      const request = {
        name: values.name,
        description: encode(values.description),
        endingDate: moment(values.endingDate).format(PATTERNS.DATE_FORMAT),
        endingTime: moment(values.endingTime).format(PATTERNS.TIME_FORMAT),
        startingDate: moment(values.startingDate).format(PATTERNS.DATE_FORMAT),
        startingTime: moment(values.startingTime, PATTERNS.TIME_FORMAT),
        eventCategoryList: handleEventCategoryList(values.eventCategoryList),
        province: values.province,
        venue: values.venue,
        venue_address: values.venue_address,
        organizationTickets: handleTicketList(values.ticketList),
        totalTicket: sumBy(values.ticketList, "quantity"),
        remainingTicket: sumBy(values.ticketList, "quantity"),
        host_id: user.id,
      };
      console.log({ request });
      if (!eventId) {
        var response = await createEvent(user.id, request);
        if (response.status === 200) {
          var uploadBackground = await uploadEventBackground(
            response.data,
            user.id,
            handleFormData(values.background)
          );
        }
        if (response.status === 200 || uploadBackground.status === 200) {
          formik.setValues(initialValues);
        }
        showNotification(
          response.status === 200 || uploadBackground.status === 200
        );
      } else {
        var responseUpdate = await updateEvent(eventId, user.id, request);
        if (
          responseUpdate.status === 200 &&
          typeof values.background === "object"
        ) {
          var uploadBackgroundUpdate = await uploadEventBackground(
            response.data,
            user.id,
            handleFormData(values.background)
          );
        }
        if (
          responseUpdate.status === 200 ||
          uploadBackgroundUpdate.status === 200
        ) {
          formik.setValues(initialValues);
        }
        showNotification(
          responseUpdate.status === 200 || uploadBackgroundUpdate.status === 200
        );
      }
    },
  });
  const { handleSubmit, values, setValues } = formik;
  useEffect(() => {
    setDate(moment(values.startingDate).format(PATTERNS.DATE_FORMAT));
  }, [values.startingDate]);
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
  const handleTicketList = (list) => {
    const newArr = list.map((t) => ({
      ...t,
      quantity: Number(t.quantity),
      currency: values.currency,
    }));
    return newArr;
  };
  const showNotification = (code) => {
    if (code) {
      return AlertPopup({
        title: t("popup.create-event.success"),
      });
    }
    return AlertErrorPopup({
      title: t("popup.create-event.error"),
    });
  };
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
                      <Col span={8}>
                        <button
                          className="primary-button self-start w-64"
                          onClick={() =>
                            push({
                              id: generateId(user.name, date),
                              currency: values.currency,
                              price: 0,
                              quantity: 0,
                              ticketName: "",
                            })
                          }
                        >
                          {t("ticket.create")}
                        </button>
                      </Col>
                      <Col span={16}>
                        <Field
                          name="currency"
                          component={SelectHorizonal}
                          label={t("event.currency")}
                          options={Object.values([
                            { value: "USD", label: "USD" },
                            { value: "VND", label: "VND" },
                          ]).map((field) => ({
                            value: field.value,
                            name: field.label,
                          }))}
                        />
                      </Col>
                    </Row>
                    {values.ticketList?.map((_, index) => (
                      <div className="p-3 border-gray-400 border-4 border-dashed my-2 rounded-lg bg-gray-200 relative">
                        <Row gutter={[4, 24]} className="flex items-start">
                          <Col span={10}>
                            <Field
                              name={`ticketList[${index}].ticketName`}
                              component={Input}
                              label={t("event.ticketList.ticketName", {
                                val: index + 1,
                              })}
                            />
                          </Col>
                          <Col span={6}>
                            <Field
                              name={`ticketList[${index}].price`}
                              component={Input}
                              label={t("event.ticketList.price", {
                                val: index + 1,
                              })}
                            />
                          </Col>
                          <Col span={6}>
                            <Field
                              name={`ticketList[${index}].quantity`}
                              component={Input}
                              label={t("event.ticketList.quantity", {
                                val: index + 1,
                              })}
                            />
                          </Col>
                        </Row>
                        <Row gutter={[8, 24]}>
                          <Col span={22}>
                            <Field
                              name={`ticketList[${index}].description`}
                              component={Editor}
                              label={t("event.ticketList.description", {
                                val: index + 1,
                              })}
                            />
                          </Col>
                        </Row>
                        {index > 0 && (
                          <>
                            <FaTrashAlt
                              className="text-red-600 text-2xl absolute bottom-5 right-5 hover:animate-bounce cursor-pointer"
                              type="button"
                              onClick={() => remove(index)}
                            />
                          </>
                        )}
                      </div>
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
              <Col span={12}>
                <button className="primary-button" type="submit">
                  {t("submit")}
                </button>
              </Col>
              <Col span={12}>
                <button
                  className="secondary-button border-primary border-1 text-primary bg-white"
                  type="submit"
                  onClick={() => formik.setValues(initialValues)}
                >
                  {t("reset")}
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
