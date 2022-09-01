import React from "react";
import { Grid, Spin } from "antd";

const Loading = () => {
  return (
    <div className='flex justify-center items-center w-full h-[100vh]'>
      <div className='flex flex-col items-center'>
        <div>
          <div class='loadingio-spinner-rolling-yy726xt8scc'>
            <div class='ldio-ugbylpcr1j'>
              <div></div>
            </div>
          </div>
        </div>
        <p className='text-2xl'>Loading ... </p>
      </div>
    </div>
  );
};

export default Loading;
