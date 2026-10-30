package com.kindfund.kindfund;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin
public class DonationController {

    @Autowired
    private DonationRepository donationRepository;

    // SAVE DONATION
    @PostMapping
    public ResponseEntity<?> createDonation(@RequestBody Donation donation) {

        if (donation.getCategory() == null ||
                donation.getCategory().isEmpty()) {

            donation.setCategory("General");
        }
        if (donation.getDonorEmail() == null ||
                donation.getDonorEmail().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Donor email is required");
        }

        if (donation.getCampaignName() == null ||
                donation.getCampaignName().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Campaign name is required");
        }

        if (donation.getAmount() == null ||
                donation.getAmount() <= 0) {

            return ResponseEntity.badRequest()
                    .body("Please enter a valid donation amount");
        }

        if (donation.getPaymentMethod() == null ||
                donation.getPaymentMethod().isEmpty()) {

            return ResponseEntity.badRequest()
                    .body("Payment method is required");
        }

        donation.setStatus("SUCCESSFUL");

        Donation savedDonation =
                donationRepository.save(donation);

        return ResponseEntity.ok(savedDonation);
    }

    // GET DONATIONS OF A DONOR
    @GetMapping("/donor/{email}")
    public ResponseEntity<List<Donation>> getDonorDonations(
            @PathVariable String email) {

        List<Donation> donations =
                donationRepository
                        .findByDonorEmailOrderByDonationDateDesc(email);

        return ResponseEntity.ok(donations);
    }
}