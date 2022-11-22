package com.hcmute.bookingevent.payload.request;

import lombok.Data;

@Data
public class OrganizationProfileReq {
    private String province;
    private String venue;
    private String address;
    private String biography;
}
