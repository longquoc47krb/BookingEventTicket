/* eslint-disable quotes */
import { Col, Row, Switch } from "antd";
import { Field, FieldArray, Form, FormikProvider, useFormik } from "formik";
import styled from "styled-components";
import { t } from "i18next";
import { decode, encode } from "js-base64";
import { has, map, sumBy } from "lodash";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
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
import ThreeDotsLoading from "../components/ThreeLoading";
import UploadImage from "../components/Upload";
import { userInfoSelector } from "../redux/slices/accountSlice";
import { setInitialBackground } from "../redux/slices/eventSlice";
import theme from "../shared/theme";
import constants, { TicketStatus } from "../utils/constants";
import { provinces } from "../utils/provinces";
import {
  convertMongodbTimeToString,
  generateId,
  isNotEmpty,
} from "../utils/utils";
import { YupValidations } from "../utils/validate";
import Editor from "./Editor";
import organizationServices, {
  useFetchTemplateTicket,
} from "../api/services/organizationServices";
const { getEventById, createEvent, uploadEventBackground, updateEvent } =
  eventServices;
const { createTemplateTicket } = organizationServices;
const { PATTERNS } = constants;

export const StyledSwitch = styled(Switch)`
  &&&.ant-switch-checked {
    background-color: #1f3e82;
  }
  &&&.ant-switch {
    outline: 1.2px solid gray;
  }
`;

function AddEditEvent(props) {
  const { eventId } = useParams();
  const [useTemplate, setUseTemplate] = useState(false);
  const [saveTemplate, setSaveTemplate] = useState(false);
  const [useDefaultAddress, setUseDefaultAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment().format(PATTERNS.DATE_FORMAT));
  const user = useSelector(userInfoSelector);
  const [event, setEvent] = useState({});
  const { data: categories, status } = useFetchCategories();
  const { data: templateTickets, status: templateStatus } =
    useFetchTemplateTicket(user.id);
  const initialValues = {
    background: null,
    name: "",
    startingDate: moment(),
    endingDate: moment(),
    startingTime: moment(),
    eventCategoryList: [],
    endingTime: moment(),
    description: "",
    province: "",
    // currency: "VND",
    currency: "USD",
    venue: "",
    venue_address: "",
    ticketList: [
      {
        id: generateId(user.name, date),
        price: 0,
        ticketName: "",
        status: TicketStatus.AVAILABLE,
        description: "",
        // currency: "VND",
        currency: "USD",
        quantity: 0,
        quantityRemaining: 0,
      },
    ],
  };
  const handleTemplateTicket = () => {
    let newArr = [];
    if (isNotEmpty(templateTickets)) {
      for (const element of templateTickets) {
        newArr.push({
          id: generateId(user.name, date),
          ticketName: element?.ticketName,
          price: element?.price,
          description: element?.description,
          quantity: element?.quantity,
          quantityRemaining: element?.quantity,
          // currency: element?.currency,
          currency: "USD",
          status: "ticket.available",
        });
      }
    }
    return newArr;
  };
  const handleEventCategoryList = (list) => {
    let temp = [];
    for (const element of list) {
      temp.push({ id: element });
    }
    return temp;
  };

  // console.log("currency", event?.organizationTickets[0].currency);
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
      startingTime: YupValidations.startingTime,
      eventCategoryList: YupValidations.categories,
      endingDate: YupValidations.endingDate,
      endingTime: YupValidations.endingTime,
      description: YupValidations.description,
      venue: YupValidations.venue,
      province: YupValidations.province,
      venue_address: YupValidations.address,
      ticketList: YupValidations.ticketList,
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const request = {
        name: values.name,
        description: encode(values.description),
        endingDate: moment(values.endingDate).format(PATTERNS.DATE_FORMAT),
        endingTime: moment(values.endingTime).format(PATTERNS.TIME_FORMAT),
        startingDate: moment(values.startingDate).format(PATTERNS.DATE_FORMAT),
        startingTime: moment(values.startingTime).format(PATTERNS.TIME_FORMAT),
        eventCategoryList: handleEventCategoryList(values.eventCategoryList),
        province: values.province,
        venue: values.venue,
        venue_address: values.venue_address,
        organizationTickets: handleTicketList(values.ticketList),
        ticketTotal: sumBy(handleTicketList(values.ticketList), "quantity"),
        ticketRemaining: sumBy(handleTicketList(values.ticketList), "quantity"),
        host_id: user.id,
      };
      if (saveTemplate) {
        await createTemplateTicket(user.id, request.organizationTickets);
      }
      if (!eventId) {
        let responseUpdate = await createEvent(user.id, request);
        if (responseUpdate.status === 200) {
          var uploadBackground = await uploadEventBackground(
            responseUpdate.data,
            user.id,
            handleFormData(values.background)
          );
        }

        if (responseUpdate.status === 200 || uploadBackground.status === 200) {
          formik.setValues(initialValues);
          setUseTemplate(false);
          dispatch(setInitialBackground(null));
        }
        showNotification(
          responseUpdate.status === 200 || uploadBackground.status === 200
        );
        setLoading(false);
      } else {
        let responseUpdate = await updateEvent(eventId, user.id, request);
        var uploadBackgroundUpdate =
          typeof values.background === "object" ??
          (await uploadEventBackground(
            eventId,
            user.id,
            handleFormData(values.background)
          ));
        setLoading(false);
        showNotification(
          responseUpdate.status === 200 || uploadBackgroundUpdate.status === 200
        );
      }
    },
  });
  const { handleSubmit, setFieldValue, values, setValues, errors } = formik;
  useEffect(() => {
    console.log({ values, errors });
    // console.group();
    // console.log({ eventId });
    // console.log({ errors });
    // console.log("ticketList:", handleTicketList(values.ticketList));
    // console.log("useTemplate:", useTemplate);
    // console.log("saveTemplate:", saveTemplate);
    // console.log("handleTemplateTicket:", handleTemplateTicket());
    // console.log({
    //   name: values.name,
    //   description: encode(values.description),
    //   endingDate: moment(values.endingDate).format(PATTERNS.DATE_FORMAT),
    //   endingTime: moment(values.endingTime).format(PATTERNS.TIME_FORMAT),
    //   startingDate: moment(values.startingDate).format(PATTERNS.DATE_FORMAT),
    //   startingTime: moment(values.startingTime).format(PATTERNS.TIME_FORMAT),
    //   eventCategoryList: handleEventCategoryList(values.eventCategoryList),
    //   province: values.province,
    //   venue: values.venue,
    //   venue_address: values.venue_address,
    //   organizationTickets: handleTicketList(values.ticketList),
    //   totalTicket: sumBy(handleTicketList(values.ticketList), "quantity"),
    //   remainingTicket: sumBy(handleTicketList(values.ticketList), "quantity"),
    //   host_id: user.id,
    // });
    // console.groupEnd();
  }, [values, errors]);

  useEffect(() => {
    setDate(moment(values.startingDate).format(PATTERNS.DATE_FORMAT));
  }, [values.startingDate]);
  // For fetch template tickets
  useEffect(() => {
    if (useTemplate && useDefaultAddress) {
      setFieldValue("province", user.province);
      setFieldValue("venue", user.venue);
      setFieldValue("venue_address", user.address);
    } else if (useTemplate && !useDefaultAddress) {
      setFieldValue("ticketList", handleTemplateTicket());
    } else if (!useTemplate && useDefaultAddress) {
      setFieldValue("province", user.province);
      setFieldValue("venue", user.venue);
      setFieldValue("venue_address", user.address);
    }
    if (!useTemplate) {
      setFieldValue("ticketList", initialValues.ticketList);
    }
  }, [useTemplate, useDefaultAddress]);

  // For edit event
  useEffect(() => {
    if (eventId) {
      async function fetchEvent() {
        const res = await getEventById(eventId);
        setEvent(res);
        dispatch(setInitialBackground(res.background));
        setValues({
          background: res.background,
          name: res.name,
          // currency: res.organizationTickets[0].currency,
          currency: "USD",
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
      // currency: values.currency,
      currency: "USD",
      quantity: Number(t.quantity),
      quantityRemaining: Number(t.quantity),
      status:
        Number(t.quantity) === 0
          ? TicketStatus.SOLDOUT
          : TicketStatus.AVAILABLE,
    }));
    return newArr;
  };
  const showNotification = (code) => {
    if (code) {
      return AlertPopup({
        title: !eventId
          ? t("popup.create-event.success")
          : t("popup.edit-event.success"),
      });
    }
    return AlertErrorPopup({
      title: !eventId
        ? t("popup.create-event.error")
        : t("popup.edit-event.error"),
    });
  };
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category={eventId ? t("event.edit") : t("event.create")}
        title={t("sider.event")}
      />
      <div>
        <div className="flex justify-between w-full">
          <h1 className="font-medium text-lg text-gray-400">
            {eventId
              ? `${t("event.createDate")}${convertMongodbTimeToString(
                  event.createdDate
                )}`
              : null}
          </h1>
          <h1 className="font-medium text-lg text-gray-400">
            {has(event, "updatedDate") && event.updatedDate
              ? `${t("event.updateDate")}${convertMongodbTimeToString(
                  event.updatedDate
                )}`
              : null}
          </h1>
        </div>
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
              <Col span={16}>
                <Field
                  name="startingDate"
                  component={DatePicker}
                  label={t("event.startingDate")}
                />
              </Col>
              <Col span={8}>
                <Field
                  name="startingTime"
                  component={TimePicker}
                  label={t("event.startingTime")}
                />
              </Col>
            </Row>
            <Row gutter={[8, 40]} style={{ lineHeight: "2rem" }}>
              <Col span={16}>
                <Field
                  name="endingDate"
                  component={DatePicker}
                  label={t("event.endingDate")}
                />
              </Col>
              <Col span={8}>
                <Field
                  name="endingTime"
                  component={TimePicker}
                  label={t("event.endingTime")}
                />
              </Col>
            </Row>
            <Row gutter={[8, 40]} style={{ lineHeight: "2rem" }}>
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

            <Col span={8}>
              <div className="flex gap-x-3 items-center mb-4">
                <h1 className="text-primary text-xl font-semibold">
                  {t("default-address")}
                </h1>
                <StyledSwitch
                  defaultChecked={false}
                  checked={useDefaultAddress}
                  onChange={(checked) => setUseDefaultAddress(checked)}
                  className="my-4"
                />
              </div>
            </Col>
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
                              price: 0,
                              ticketName: "",
                              status: TicketStatus.AVAILABLE,
                              description: "",
                              // currency: values.currency,
                              currency: "USD",
                              quantity: 0,
                              quantityRemaining: 0,
                            })
                          }
                        >
                          {t("ticket.create")}
                        </button>
                      </Col>
                      <Col span={8}>
                        <h1 className="text-gray-400 italic text-lg my-2">
                          {t("default-currency")}
                        </h1>
                      </Col>
                      <Col span={8}>
                        <div className="flex gap-x-3 items-center">
                          <h1 className="text-primary text-xl font-semibold">
                            {t("template-ticket")}
                          </h1>

                          <StyledSwitch
                            defaultChecked={false}
                            checked={useTemplate}
                            onChange={(checked) => setUseTemplate(checked)}
                          />
                        </div>
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
                            <Editor
                              name={`ticketList[${index}].description`}
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
            <div className="flex gap-x-3 items-center mb-4">
              <h1 className="text-primary text-xl font-semibold">
                {t("save-template-ticket")}
              </h1>
              <StyledSwitch
                defaultChecked={false}
                onChange={(checked) => setSaveTemplate(checked)}
              />
            </div>
            <Row gutter={[48, 40]}>
              <Col span={24}>
                <Editor name="description" label={t("event.description")} />
              </Col>
            </Row>
            <Row gutter={[48, 40]} style={{ marginTop: "1rem" }}>
              <Col span={12}>
                <button className="primary-button" type="submit">
                  {loading ? <ThreeDotsLoading /> : t("submit")}
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
