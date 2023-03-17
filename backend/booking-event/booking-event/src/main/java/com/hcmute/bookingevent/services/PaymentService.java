package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Admin;
import com.hcmute.bookingevent.models.EPaymentStatus;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.organization.PaymentPending;
import com.hcmute.bookingevent.repository.AdminRepository;
import com.hcmute.bookingevent.repository.OrganizationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final OrganizationRepository organizationRepository;

    private final AdminRepository adminRepository;
    public PaymentPending setPaymentToInProgress(String idEvent) {
        PaymentPending paymentPending = new PaymentPending();
        try {
            if (idEvent != null) {
                paymentPending.setIdEvent(idEvent);
                paymentPending.setStatus(EPaymentStatus.INPROGRESS);
                paymentPending.setVNDBalanceLock("0");
                paymentPending.setUSDBalanceLock("0");
            }
            return paymentPending;
        } catch (Exception e) {
            throw new NotFoundException("Can not setPaymentToInProgress " + e);
        }

    }

    public void setPaymentToCancel(List<PaymentPending> pendingList, String idEvent) {

        for (PaymentPending element : pendingList) {
            if (element.getIdEvent().equals(idEvent)) {
                element.setStatus(EPaymentStatus.CANCEL);
                return;
            }
        }
    }

    public void setPaymentToCountedVND(Organization organization, String idEvent, BigDecimal valueVND) {
        Optional<Admin> admin= adminRepository.findByEmail("lotusticket.vn@gmail.com");

        for (PaymentPending element : organization.getPaymentPendings()) {
            if (element.getIdEvent().equals(idEvent)) {
                //get VNDBlock previous
                BigDecimal vndBlock = new BigDecimal(element.getVNDBalanceLock());
                //no rounded
                BigDecimal result = vndBlock.add(valueVND);
                BigDecimal adminVND = new BigDecimal(admin.get().getVNDPendingProfit());
                //add
                admin.get().setVNDPendingProfit(adminVND.add(valueVND).toString() );
                element.setVNDBalanceLock(result.toString());
                adminRepository.save(admin.get());

                return;
            }
        }
    }

    public void setPaymentToCountedUSD(Organization organization, String idEvent, BigDecimal valueUSD) {
        Optional<Admin> admin= adminRepository.findByEmail("lotusticket.vn@gmail.com");

        for (PaymentPending element : organization.getPaymentPendings()) {
            if (element.getIdEvent().equals(idEvent)) {
                BigDecimal usdBlock = new BigDecimal(element.getUSDBalanceLock());
                BigDecimal result = usdBlock.add(valueUSD).setScale(2, RoundingMode.DOWN);
                //
                BigDecimal adminUSD = new BigDecimal(admin.get().getUSDPendingProfit());
                admin.get().setUSDPendingProfit(adminUSD.add(valueUSD).toString() );
                element.setVNDBalanceLock(result.toString());
                adminRepository.save(admin.get());
                return;
            }
        }
    }

    public void setPaymentToCompleted(Event event) {
        List<Organization> organizationList = organizationRepository.findAll();

        try {
            for (Organization element : organizationList) {
                if (element.getEventList().contains(event.getId())) {
                    for (PaymentPending elementPayment : element.getPaymentPendings()) {
                        if (elementPayment.getIdEvent().equals(event.getId())) {
                            //get adminAccount
                            Optional<Admin> admin= adminRepository.findByEmail("lotusticket.vn@gmail.com");
                            elementPayment.setStatus(EPaymentStatus.COMPLETED);
                            //devide 5
                            BigDecimal num5 = new BigDecimal("5");
                            if (event.getOrganizationTickets().get(0).getCurrency().equals("USD")) {
                                BigDecimal totalPaymentOfOrganizerUSD = new BigDecimal(element.getUSDBalance());
                                BigDecimal usdBlock = new BigDecimal(elementPayment.getUSDBalanceLock());
                                //lấy số khóa chia cho 5
                                BigDecimal addMoneyForAdmin = usdBlock.divide(num5);
                                addMoneyForAdmin = addMoneyForAdmin.setScale(2, RoundingMode.DOWN);
                                //trừ tiền pending của admin
                                BigDecimal totalPendingUSD = new BigDecimal(admin.get().getUSDPendingProfit()) ;
                                admin.get().setUSDPendingProfit(totalPendingUSD.subtract(totalPaymentOfOrganizerUSD).toString());
                                //admin.get().setUSDPendingProfit();
                                //add vào tài khoản admin
                                admin.get().setUSDBalance(addMoneyForAdmin.toString());
                                adminRepository.save(admin.get());
                                //số tiền thực mà organizer nhận được
                                BigDecimal subtractResult = usdBlock.subtract(addMoneyForAdmin);
                                //cộng vào số dư sau khi đã trừ đi tiền mà admin nhận
                                BigDecimal result = totalPaymentOfOrganizerUSD.add(subtractResult).setScale(2, RoundingMode.DOWN);
                                element.setUSDBalance(result.toString());
                            } else {
                                BigDecimal totalPaymentOfOrganizerVND = new BigDecimal(element.getVNDBalance());
                                BigDecimal vndBlock = new BigDecimal(elementPayment.getVNDBalanceLock());
                                //lấy số khóa chia cho 5
                                BigDecimal addMoneyForAdmin = vndBlock.divide(num5);
                                //k cần làm tròn
                                //addMoneyForAdmin = addMoneyForAdmin.setScale(2, RoundingMode.DOWN);
                                //trừ tiền pending profit của admin
                                BigDecimal totalPendingVND = new BigDecimal(admin.get().getVNDPendingProfit()) ;
                                admin.get().setVNDPendingProfit(totalPendingVND.subtract(totalPaymentOfOrganizerVND).toString());
                                //add vào tài khoản admin
                                admin.get().setVNDBalance(addMoneyForAdmin.toString());
                                adminRepository.save(admin.get());
                                //số tiền thực mà organizer nhận được
                                BigDecimal subtractResult = vndBlock.subtract(addMoneyForAdmin);
                                //cộng vào số dư sau khi đã trừ đi tiền mà admin nhận
                                BigDecimal result = totalPaymentOfOrganizerVND.add(subtractResult).setScale(2, RoundingMode.DOWN);
                                element.setVNDBalance(result.toString());
                            }
                            organizationRepository.save(element);
                        }
                    }
                    return;
                }
            }
        } catch (Exception e) {
            throw new NotFoundException("Can not set Payment for finishing" + e);
        }
    }
}
