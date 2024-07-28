/*
ALL THIS DATA IS DUMMY. hardcoded outputs so we can test the front end. just change directory in routes to the correct 
controllers file to use the correct code
*/

export default fake_db = {
    um_request_log: [
      {
        request_id: 1,
        service_id: 100,
        user_id: 2,
        site_id: 2,
        auth_id: 3,
        code: 200,

      }
    ],
  
    um_creation_log: [
      {
        log_id: 1,
        user_id: 100,
        site_id: 2,
        table_name: 'um_user',
        record_id: 3,
        created_at: '2021-08-01',
      },
      {
        log_id: 2,
        user_id: 101,
        site_id: 2,
        table_name: 'um_user',
        record_id: 4,
        created_at: '2021-08-01',
      },
      {
        log_id: 3,
        user_id: 102,
        site_id: 2,
        table_name: 'um_user',
        record_id: 5,
        created_at: '2021-08-01',
      },
    ],
  
    um_deletion_log: [
      {
        log_id: 1,
        user_id: 100,
        site_id: 2,
        table_name: 'um_user',
        record_id: 3,
        created_at: '2021-08-01',
      },
      {
        log_id: 2,
        user_id: 101,
        site_id: 2,
        table_name: 'um_user',
        record_id: 4,
        created_at: '2021-08-01',
      },
      {
        log_id: 3,
        user_id: 102,
        site_id: 2,
        table_name: 'um_user',
        record_id: 5,
        created_at: '2021-08-01',
      }
    ],
  
    um_modification_log: [
      {
        log_id: 1,
        user_id: 100,
        site_id: 2,
        table_name: 'um_user',
        record_id: 3,
        created_at: '2021-08-01',
      },
      {
        log_id: 2,
        user_id: 101,
        site_id: 2,
        table_name: 'um_user',
        record_id: 4,
        created_at: '2021-08-01',
      },
      {
        log_id: 3,
        user_id: 102,
        site_id: 2,
        table_name: 'um_user',
        record_id: 5,
        created_at: '2021-08-01',
      }
    ],
  
    um_deletion_log_detail: [
      {
        field_modification_id: 1,
        log_id: 1,
        field_name: 'deleteFirstField',
        old_value: "sight",
      },
      {
        field_modification_id: 2,
        log_id: 2,
        field_name: 'deleteSecondField',
        old_value: "smell",
      },
      {
        field_modification_id: 3,
        log_id: 3,
        field_name: 'deleteFirstField',
        old_value: "sound",
      }
    ],
  
    um_modification_log_detail: [
      {
        field_modification_id: 1,
        log_id: 1,
        field_name: 'modificationFieldOne',
        old_value: 'John Doe',
      },
      {
        field_modification_id: 2,
        log_id: 2,
        field_name: 'modificationFieldTwo',
        old_value: 'Jane Doe',
      },
      {
        field_modification_id: 3,
        log_id: 3,
        field_name: 'modificationFieldThree',
        old_value: 'Tae Kwon Do',
      }
    ]
  }