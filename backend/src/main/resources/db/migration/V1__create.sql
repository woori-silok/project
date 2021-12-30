create table attach_file
(
    file_id    bigint not null auto_increment,
    file_name  varchar(255),
    minutes_id bigint not null,
    primary key (file_id)
);

create table attendee
(
    attendee_id    bigint       not null auto_increment,
    is_host        bit          not null,
    is_writer      bit          not null,
    status         varchar(255) not null,
    username       varchar(255) not null,
    reservation_id bigint       not null,
    primary key (attendee_id)
);

create table authority
(
    authority_id   bigint not null auto_increment,
    authority_name varchar(255),
    primary key (authority_id)
);

create table member
(
    username         varchar(255) not null,
    created_by       varchar(255),
    created_date     datetime(6),
    last_modified_by varchar(255),
    modified_date    datetime(6),
    name             varchar(255) not null,
    password         varchar(255) not null,
    primary key (username)
);

create table member_authority
(
    username     varchar(255) not null,
    authority_id bigint       not null,
    primary key (username, authority_id)
);

create table minutes
(
    minutes_id       bigint not null auto_increment,
    created_by       varchar(255),
    created_date     datetime(6),
    last_modified_by varchar(255),
    modified_date    datetime(6),
    content          TEXT,
    primary key (minutes_id)
);

create table online
(
    online_id  bigint not null auto_increment,
    is_online  bit,
    online_url varchar(255),
    primary key (online_id)
);

create table reservation
(
    reservation_id   bigint       not null auto_increment,
    created_by       varchar(255),
    created_date     datetime(6),
    last_modified_by varchar(255),
    modified_date    datetime(6),
    date             date         not null,
    end_time         varchar(255)         not null,
    month            integer      not null,
    note             varchar(255),
    start_time       varchar(255)         not null,
    title            varchar(255) not null,
    week             integer      not null,
    minutes_id       bigint       not null,
    online_id        bigint       not null,
    room_id          bigint       not null,
    subject_id       bigint       not null,
    primary key (reservation_id)
);

create table room
(
    room_id  bigint       not null auto_increment,
    capacity integer      not null,
    facility varchar(255) not null,
    location varchar(255) not null,
    name     varchar(255) not null,
    note     varchar(255) not null,
    primary key (room_id)
);

create table subject
(
    subject_id   bigint not null auto_increment,
    subject_name varchar(255),
    primary key (subject_id)
);

alter table attach_file
    add constraint FK5uybg7vwshrwsww061tgidfbw
        foreign key (minutes_id)
            references minutes (minutes_id);

alter table attendee
    add constraint FKmus0psktworq19ig5beslrsp4
        foreign key (username)
            references member (username);

alter table attendee
    add constraint FK6jwudckoquqrj0tumy4816pqd
        foreign key (reservation_id)
            references reservation (reservation_id);

alter table member_authority
    add constraint FKdwwiedqgxx71ntry92wvgmmh1
        foreign key (authority_id)
            references authority (authority_id);

alter table member_authority
    add constraint FKoimc81003nb29gbvq9saxlr4p
        foreign key (username)
            references member (username);

alter table reservation
    add constraint FKfim8uo9delwfbapc1e2ig0s19
        foreign key (minutes_id)
            references minutes (minutes_id);

alter table reservation
    add constraint FK7nljioqu0n9vywcunnx0mpsse
        foreign key (online_id)
            references online (online_id);

alter table reservation
    add constraint FKm8xumi0g23038cw32oiva2ymw
        foreign key (room_id)
            references room (room_id);

alter table reservation
    add constraint FKewd8gkcr657aplcchga7l9dfx
        foreign key (subject_id)
            references subject (subject_id);