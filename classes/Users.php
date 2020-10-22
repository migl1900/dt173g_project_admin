<?php
// Class that checks and login user by setting correct sessions
class Users extends DbConnect {

    public function loginUser($username, $password) {
        $sql = "SELECT * FROM dt173g_project_user WHERE username = '" . $username . "'";
        $result = $this->db->query($sql);

        if($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if(password_verify($password, $row["password"])) {
                $_SESSION["username"] = $row["username"];
                $_SESSION["active"] = $row["secret"];
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    // Value to verify current user credentials
    public function getSecret($username) {
        $sql = "SELECT secret FROM dt173g_project_user WHERE username = '" . $username . "'";
        $result = $this->db->query($sql);
        $row = $result->fetch_assoc();
        return $row["secret"];
    }
}