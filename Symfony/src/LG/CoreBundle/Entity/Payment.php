<?php

namespace LG\CoreBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Payment
 *
 * @ORM\Table(name="payment")
 * @ORM\Entity(repositoryClass="LG\CoreBundle\Repository\paymentRepository")
 */
class Payment
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="credit_card_number", type="integer")
     */
    private $creditCardNumber;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="expiration_card_number", type="date")
     */
    private $expirationCardNumber;

    /**
     * @var int
     *
     * @ORM\Column(name="cryptogramme", type="integer")
     */
    private $cryptogramme;

    /**
     * @var bool
     *
     * @ORM\Column(name="cgv_accept", type="boolean")
     */
    private $cgvAccept;


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set creditCardNumber
     *
     * @param integer $creditCardNumber
     *
     * @return payment
     */
    public function setCreditCardNumber($creditCardNumber)
    {
        $this->creditCardNumber = $creditCardNumber;

        return $this;
    }

    /**
     * Get creditCardNumber
     *
     * @return int
     */
    public function getCreditCardNumber()
    {
        return $this->creditCardNumber;
    }

    /**
     * Set expirationCardNumber
     *
     * @param \DateTime $expirationCardNumber
     *
     * @return payment
     */
    public function setExpirationCardNumber($expirationCardNumber)
    {
        $this->expirationCardNumber = $expirationCardNumber;

        return $this;
    }

    /**
     * Get expirationCardNumber
     *
     * @return \DateTime
     */
    public function getExpirationCardNumber()
    {
        return $this->expirationCardNumber;
    }

    /**
     * Set cryptogramme
     *
     * @param integer $cryptogramme
     *
     * @return payment
     */
    public function setCryptogramme($cryptogramme)
    {
        $this->cryptogramme = $cryptogramme;

        return $this;
    }

    /**
     * Get cryptogramme
     *
     * @return int
     */
    public function getCryptogramme()
    {
        return $this->cryptogramme;
    }

    /**
     * Set cgvAccept
     *
     * @param boolean $cgvAccept
     *
     * @return payment
     */
    public function setCgvAccept($cgvAccept)
    {
        $this->cgvAccept = $cgvAccept;

        return $this;
    }

    /**
     * Get cgvAccept
     *
     * @return bool
     */
    public function getCgvAccept()
    {
        return $this->cgvAccept;
    }
}

