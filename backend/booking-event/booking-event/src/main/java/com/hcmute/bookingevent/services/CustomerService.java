package com.hcmute.bookingevent.services;

import com.hcmute.bookingevent.Implement.ICustomerService;
import com.hcmute.bookingevent.exception.NotFoundException;
import com.hcmute.bookingevent.models.Customer;
import com.hcmute.bookingevent.payload.response.ResponseObject;
import com.hcmute.bookingevent.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerService  implements ICustomerService {
    //@Autowired
    private CustomerRepository customerRepository;



    @Override
    public ResponseEntity<?> findAll()
    {
        List<Customer> list = customerRepository.findAll();
        if (list.size() > 0)
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Get all Customer", list,200));
        throw new NotFoundException("Can not found any account");
    }
    @Override
    public ResponseEntity<?> createAccount(Customer newAccount)
    {
        Customer account = customerRepository.save(newAccount);
        System.out.println(account.getId());
        if(newAccount!=null)
        {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ResponseObject(true, "Create account successfully ", customerRepository.save(newAccount),200));

        }
        throw new NotFoundException("Can not create any account");
    }
}
