Feature: GoToCinema tests
    Scenario: Successful standart ticket booking
        Given user is on booking page
        When user choice day
        When user choice hall 
        When user choice seat
        When user click on button booking
        Then user sees the text "Вы выбрали билеты"