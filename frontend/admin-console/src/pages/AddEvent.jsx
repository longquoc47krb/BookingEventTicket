/* eslint-disable quotes */
import { Col, message, Row } from "antd";
import { t } from "i18next";
import React, { useState } from "react";
import { Header } from "../components";
import UploadImage from "../components/Upload";
import { useFormik, Field, Form, FormikProvider } from "formik";
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
    eventCategoryList: event?.eventCategoryList ?? [],
    endingTime: event?.endingTime ?? "",
    description: event?.description ?? "",
    province: event?.province ?? "",
    venue: event?.venue ?? "",
    venue_address: event?.venue_address ?? "",
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object().shape({
      name: YupValidations.name,
      startingDate: YupValidations.startingDate,
      endingDate: YupValidations.endingDate,
      description: YupValidations.name,
      venue: YupValidations.name,
      venue_address: YupValidations.name,
    }),
    onSubmit: async (values) => {},
  });
  const { handleSubmit, values } = formik;
  console.log("formik: ", values);
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
                    key: field.name,
                    value: field.name,
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
