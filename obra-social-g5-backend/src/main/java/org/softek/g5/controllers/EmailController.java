package org.softek.g5.controllers;

import org.softek.g5.entities.email.EmailRequest;
import org.softek.g5.services.EmailService;

import jakarta.inject.Inject;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

@Path("/email")
public class EmailController {

    @Inject
    EmailService emailService;

    @POST
    public Response sendEmail(EmailRequest emailRequest) {
        try {
            emailService.sendEmail(emailRequest.getTo(), emailRequest.getSubject(), emailRequest.getBody());
            return Response.ok().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()).build();
        }
    }
}

