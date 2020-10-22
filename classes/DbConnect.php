<?php
// Class handling db connection
class DbConnect {
    protected $db;

    function __construct() {
        $this->db = new mysqli(DBHOST, DBUSER, DBPASS, DBDATABASE);
        if($this->db->connect_errno > 0){
            die("There was a problem connectiong to the database: " . $this->db->connect_error);
        }
    }
    function __destruct() {
        $this->db->close()
            OR die("There was a problem disconnecting from the database.");
    }
}