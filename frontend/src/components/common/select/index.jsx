import { useTranslation } from "react-i18next";
import { isNotEmpty } from "../../../utils/utils";

export function Select(props) {
  const { data, icon } = props;
  const { t } = useTranslation();
  const keys = isNotEmpty(data) && Object.keys(Object.assign({}, ...data));
  return (
    <div className="select-container">
      {icon}
      <select>
        {data?.map((item, index) => (
          <option key={index} value={item[keys[0]]}>
            {t(item[keys[1]])}
          </option>
        ))}
      </select>
    </div>
  );
}
