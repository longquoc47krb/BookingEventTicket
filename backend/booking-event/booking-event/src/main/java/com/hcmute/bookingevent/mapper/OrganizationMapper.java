package com.hcmute.bookingevent.mapper;

import com.hcmute.bookingevent.models.EPaymentStatus;
import com.hcmute.bookingevent.models.EventCategory;
import com.hcmute.bookingevent.models.account.Account;
import com.hcmute.bookingevent.models.event.Event;
import com.hcmute.bookingevent.models.organization.Organization;
import com.hcmute.bookingevent.models.organization.PaymentPending;
import com.hcmute.bookingevent.payload.response.*;
import com.hcmute.bookingevent.repository.AccountRepository;
import com.hcmute.bookingevent.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class OrganizationMapper {
    private final AccountRepository accountRepository;
    private final EventRepository eventRepository;

    public AllOrganizationRes toOrganizationRes(Organization organization) {
        Optional<Account> account= accountRepository.findByEmail(organization.getEmail());
        if(account.isPresent())
        {
            return new AllOrganizationRes(account.get().getName(),organization);
        }
        return new AllOrganizationRes();
    }
    public PaymentStatusRes toPaymentStatusList(Organization organization) {
        return new PaymentStatusRes(organization.getEmail(),organization.getPaymentPendings());
    }
    public PaymentPendingResponse toPaymentPending(PaymentPending paymentPending) {
        Optional<Event> event = eventRepository.findEventById(paymentPending.getIdEvent());
        if(event.isPresent())
        {
            return new PaymentPendingResponse(event.get().getName(),paymentPending.getUSDBalanceLock(),paymentPending.getVNDBalanceLock(),paymentPending.getStatus());

        }
        else
            return new PaymentPendingResponse("null","null","null", EPaymentStatus.CANCEL);
    }
    public FollowedListRes toFollowedListRes(Organization organization) {
        return new FollowedListRes();
    }
}
