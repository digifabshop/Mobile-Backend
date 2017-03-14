<?php
namespace App\Model\Entity;

use Cake\ORM\Entity;

/**
 * Asset Entity
 *
 * @property int $id
 * @property int $project_id
 * @property int $asset_type_id
 * @property string $description
 * @property int $width
 * @property int $height
 * @property bool $in_progress
 * @property bool $visible
 * @property string $credit_name
 * @property string $credit_url
 * @property string $url
 *
 * @property \App\Model\Entity\Project $project
 * @property \App\Model\Entity\AssetType $asset_type
 */
class Asset extends Entity
{

    /**
     * Fields that can be mass assigned using newEntity() or patchEntity().
     *
     * Note that when '*' is set to true, this allows all unspecified fields to
     * be mass assigned. For security purposes, it is advised to set '*' to false
     * (or remove it), and explicitly make individual fields accessible as needed.
     *
     * @var array
     */
    protected $_accessible = [
        '*' => true,
        'id' => false
    ];
}
