Feature: GoToCinema tests
    Scenario: Successful standart ticket booking
        Given user is on booking page
        When user choice day "4"
        When user choice hall "217"
        When user choice seat row "3" coll "6"
        When user click on button booking
        Then user sees the text "Вы выбрали билеты"

    Scenario: Successful get QR-code for standart ticket booking
        Given user is on booking page
        When user choice day "6"
        When user choice hall "217"
        When user choice seat row "4" coll "2"
        When user click on button booking
        When user click on button booking
        Then user sees the text "Электронный билет"
        
    Scenario: Successful VIP ticket booking
        Given user is on booking page
        When user choice day "2"
        When user choice hall "199"
        When user choice seat row "4" coll "6"
        When user click on button booking
        Then user sees the text "Вы выбрали билеты"

    Scenario: Sade path - Booking a reserved ticket
         Given user is on booking page
        When user choice day "6"
        When user choice hall "217"
        When user choice seat row "4" coll "2"
        When user click on button booking
        Then user sees disabled button ".acceptin-button"
    
