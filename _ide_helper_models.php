<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * App\Models\About
 *
 * @property int $id
 * @property string|null $title_review
 * @property string|null $review
 * @property string|null $view
 * @property string|null $mission
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|About newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|About newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|About query()
 * @method static \Illuminate\Database\Eloquent\Builder|About whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereMission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereTitleReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|About whereView($value)
 */
	class About extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Alliance
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $description
 * @property string|null $website
 * @property string|null $image
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $footer_image
 * @property-read mixed $public_footer_image
 * @property-read mixed $public_image
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance query()
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereFooterImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Alliance whereWebsite($value)
 */
	class Alliance extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Banner
 *
 * @property int $id
 * @property string $file
 * @property string|null $alt
 * @property string|null $title
 * @property string|null $description
 * @property string|null $button_title
 * @property string|null $size
 * @property string|null $location
 * @property string $button_target
 * @property string|null $button_link
 * @property int $active
 * @property int $position
 * @property int|null $cms_slider_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $responsive_file
 * @property-read \App\Models\CmsSlider|null $cms_slider
 * @property-read mixed $public_file
 * @property-read mixed $public_file_responsive
 * @method static \Illuminate\Database\Eloquent\Builder|Banner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Banner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Banner query()
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereAlt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereButtonLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereButtonTarget($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereButtonTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereCmsSliderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereLocation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereResponsiveFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Banner whereUpdatedAt($value)
 */
	class Banner extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Bill
 *
 * @property int $id
 * @property int $customer_id Id de la tabla customers
 * @property int $sheet_number
 * @property string $date_bill
 * @property string $link
 * @property int $total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Customer $customer
 * @method static \Illuminate\Database\Eloquent\Builder|Bill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill query()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereDateBill($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereSheetNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereUpdatedAt($value)
 */
	class Bill extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Brand
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $url
 * @property int $position
 * @property string|null $image
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $public_image
 * @method static \Illuminate\Database\Eloquent\Builder|Brand newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Brand newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Brand query()
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Brand whereUrl($value)
 */
	class Brand extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Campaign
 *
 * @property int $id
 * @property string|null $name
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $description
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign query()
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Campaign whereUpdatedAt($value)
 */
	class Campaign extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Category
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property int $position
 * @property string|null $image
 * @property string|null $banner_image
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $description
 * @property string|null $subbanner_image
 * @property int $quantity_limit
 * @property int $position_banner
 * @property string $banner_image_size
 * @property string $subbanner_image_size
 * @property string|null $unit_format
 * @property string|null $banner_image_responsive
 * @property string|null $banner_subimage_responsive
 * @property int $active_banner_home
 * @property-read mixed $public_banner_image
 * @property-read mixed $public_banner_image_responsive
 * @property-read mixed $public_banner_subimage_responsive
 * @property-read mixed $public_image
 * @property-read mixed $public_subbanner_image
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Subcategory[] $subcategories
 * @property-read int|null $subcategories_count
 * @method static \Illuminate\Database\Eloquent\Builder|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereActiveBannerHome($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereBannerImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereBannerImageResponsive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereBannerImageSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereBannerSubimageResponsive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category wherePositionBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereQuantityLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereSubbannerImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereSubbannerImageSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereUnitFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Category whereUpdatedAt($value)
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CategoryFaq
 *
 * @property int $id
 * @property string $name
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $position
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Faq[] $faqs
 * @property-read int|null $faqs_count
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq query()
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CategoryFaq whereUpdatedAt($value)
 */
	class CategoryFaq extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Claim
 *
 * @property int $id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $email
 * @property string|null $phone_code
 * @property string|null $phone
 * @property int|null $contact_issue_id
 * @property int|null $order_id
 * @property string|null $message
 * @property int $is_reply
 * @property string|null $reply
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ContactIssue|null $contact_issue
 * @property-read mixed $formated_date
 * @property-read \App\Models\Order|null $order
 * @method static \Illuminate\Database\Eloquent\Builder|Claim newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Claim newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Claim query()
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereContactIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereIsReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Claim whereUpdatedAt($value)
 */
	class Claim extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CmsSlider
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Banner[] $cms_slider_items
 * @property-read int|null $cms_slider_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider query()
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CmsSlider whereUpdatedAt($value)
 */
	class CmsSlider extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Commune
 *
 * @property int $id
 * @property string $name
 * @property int|null $province_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Province|null $province
 * @method static \Illuminate\Database\Eloquent\Builder|Commune newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Commune newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Commune query()
 * @method static \Illuminate\Database\Eloquent\Builder|Commune whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Commune whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Commune whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Commune whereProvinceId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Commune whereUpdatedAt($value)
 */
	class Commune extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Contact
 *
 * @property int $id
 * @property string|null $first_name
 * @property string|null $last_name
 * @property string|null $email
 * @property string|null $phone_code
 * @property string|null $phone
 * @property int|null $contact_issue_id
 * @property int|null $order_id
 * @property string|null $message
 * @property int $is_reply
 * @property string|null $reply
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property array|null $nested_fields
 * @property array|null $dynamic_fields
 * @property int|null $customer_id
 * @property-read \App\Models\ContactIssue|null $contact_issue
 * @property-read \App\Models\Customer|null $customer
 * @property-read mixed $formated_date
 * @property-read \App\Models\Order|null $order
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereContactIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereDynamicFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereIsReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereNestedFields($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contact whereUpdatedAt($value)
 */
	class Contact extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ContactIssue
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $type
 * @property string|null $section
 * @property int|null $campaign_id
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Campaign|null $campaign
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DynamicField[] $fields
 * @property-read int|null $fields_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DynamicField[] $fields_subject
 * @property-read int|null $fields_subject_count
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactIssue whereUpdatedAt($value)
 */
	class ContactIssue extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Customer
 *
 * @property int $id
 * @property string|null $id_number
 * @property string|null $id_type
 * @property string $first_name
 * @property string $last_name
 * @property string|null $second_last_name
 * @property string|null $phone_code
 * @property string|null $phone
 * @property string|null $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $business_name
 * @property string|null $business_id_number
 * @property string|null $commercial_business
 * @property string|null $commercial_email
 * @property string|null $commercial_address
 * @property string|null $commercial_additional_address
 * @property string|null $commercial_phone
 * @property string|null $commercial_phone_code
 * @property int|null $commercial_region_id
 * @property int|null $commercial_commune_id
 * @property string|null $recovery_pin
 * @property string|null $last_access
 * @property string|null $photo
 * @property string|null $remember_token
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int $is_guest
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read int|null $clients_count
 * @property-read \App\Models\Commune|null $commercial_commune
 * @property-read \App\Models\Region|null $commercial_region
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\CustomerAddress[] $customer_addresses
 * @property-read int|null $customer_addresses_count
 * @property-read mixed $full_name
 * @property-read mixed $full_phone
 * @property-read mixed $nice_date
 * @property-read mixed $text
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Order[] $orders
 * @property-read int|null $orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer newQuery()
 * @method static \Illuminate\Database\Query\Builder|Customer onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer query()
 * @method static \Illuminate\Database\Eloquent\Builder|Customer role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereBusinessIdNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereBusinessName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialAdditionalAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialBusiness($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialCommuneId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialPhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCommercialRegionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereIdNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereIdType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereIsGuest($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereLastAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhoneCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer wherePhoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereRecoveryPin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereSecondLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Customer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Customer withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Customer withoutTrashed()
 */
	class Customer extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\CustomerAddress
 *
 * @property int $id
 * @property string|null $name
 * @property string $address
 * @property string|null $extra_info
 * @property int|null $customer_id
 * @property int|null $region_id
 * @property int|null $commune_id
 * @property int|null $default_address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $comment
 * @property-read \App\Models\Commune|null $commune
 * @property-read \App\Models\Customer|null $customer
 * @property-read \App\Models\Region|null $region
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress query()
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereComment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereCommuneId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereDefaultAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereExtraInfo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereRegionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CustomerAddress whereUpdatedAt($value)
 */
	class CustomerAddress extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DayPayment
 *
 * @property int $id
 * @property string|null $url_pdf
 * @property float $total
 * @property int|null $payment_commission_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $date_payment
 * @property string|null $number
 * @property string|null $orders
 * @property-read mixed $nice_date
 * @property-read mixed $nice_orders
 * @property-read mixed $nice_orders_export
 * @property-read \App\Models\PaymentCommission|null $payment_commission
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment query()
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereDatePayment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereOrders($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment wherePaymentCommissionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DayPayment whereUrlPdf($value)
 */
	class DayPayment extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DeliveryCost
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $image
 * @property int|null $deadline_delivery
 * @property string $costs
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $deadline_delivery_llego
 * @property-read mixed $formated_costs
 * @property-read mixed $public_image
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost query()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereCosts($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereDeadlineDelivery($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereDeadlineDeliveryLlego($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryCost whereUpdatedAt($value)
 */
	class DeliveryCost extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DeliveryLabels
 *
 * @property int $id
 * @property string|null $label_original
 * @property string $key
 * @property string|null $label_custom
 * @property string|null $color
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $sub_label
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels query()
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereColor($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereLabelCustom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereLabelOriginal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereSubLabel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DeliveryLabels whereUpdatedAt($value)
 */
	class DeliveryLabels extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DiscountCode
 *
 * @property int $id
 * @property string $name
 * @property float|null $discount
 * @property int $active
 * @property string|null $expiration_date
 * @property int $is_forever
 * @property int $is_percentage
 * @property int|null $amount_of_use
 * @property int|null $customer_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $free_shipping
 * @property-read \App\Models\Customer|null $customer
 * @property-read mixed $formated_expiration_date
 * @property-read mixed $formated_other_expiration_date
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode query()
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereAmountOfUse($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereExpirationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereFreeShipping($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereIsForever($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereIsPercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DiscountCode whereUpdatedAt($value)
 */
	class DiscountCode extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\DynamicField
 *
 * @property int $id
 * @property string|null $name
 * @property string $type
 * @property string|null $values
 * @property int|null $contact_issue_id Id de la tabla contact_issues
 * @property string $section
 * @property int|null $parent_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|DynamicField[] $children
 * @property-read int|null $children_count
 * @property-read \App\Models\ContactIssue|null $contact_issue
 * @property-read DynamicField|null $parent
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField query()
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereContactIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|DynamicField whereValues($value)
 */
	class DynamicField extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Faq
 *
 * @property int $id
 * @property string $question
 * @property string|null $answer
 * @property int $active
 * @property int $position
 * @property int|null $category_faq_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\CategoryFaq|null $category_faq
 * @method static \Illuminate\Database\Eloquent\Builder|Faq newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Faq newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Faq query()
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereCategoryFaqId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Faq whereUpdatedAt($value)
 */
	class Faq extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\FreeDispatchProduct
 *
 * @property int $id
 * @property string|null $products
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct whereProducts($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FreeDispatchProduct whereUpdatedAt($value)
 */
	class FreeDispatchProduct extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Image
 *
 * @property int $id
 * @property string $url
 * @property int $imageable_id
 * @property string $imageable_type
 * @property string|null $alt
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Image newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Image newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Image query()
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereAlt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereImageableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereImageableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Image whereUrl($value)
 */
	class Image extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Laboratory
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $corporate_name
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Product[] $products
 * @property-read int|null $products_count
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory query()
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory whereCorporateName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Laboratory whereUpdatedAt($value)
 */
	class Laboratory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LegalBase
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $file
 * @property string|null $icon
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $public_file
 * @property-read mixed $public_icon
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase query()
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalBase whereUpdatedAt($value)
 */
	class LegalBase extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\LegalWarning
 *
 * @property int $id
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning query()
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|LegalWarning whereUpdatedAt($value)
 */
	class LegalWarning extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Log
 *
 * @property-read \App\Models\User|null $auth
 * @property-read \Illuminate\Database\Eloquent\Model|\Eloquent $logeable
 * @property-read \Illuminate\Database\Eloquent\Collection|Log[] $sub_logs
 * @property-read int|null $sub_logs_count
 * @method static \Illuminate\Database\Eloquent\Builder|Log newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Log newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Log query()
 */
	class Log extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\NestedField
 *
 * @property int $id
 * @property string $name
 * @property string|null $group_title
 * @property int $active
 * @property int $position
 * @property int|null $parent_id
 * @property int|null $campaign_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $contact_issue_id
 * @property string $section
 * @property-read \App\Models\Campaign|null $campaign
 * @property-read \Illuminate\Database\Eloquent\Collection|NestedField[] $children
 * @property-read int|null $children_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\NestedFieldQuestion[] $nested_field_questions
 * @property-read int|null $nested_field_questions_count
 * @property-read NestedField|null $parent
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField query()
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereCampaignId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereContactIssueId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereGroupTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedField whereUpdatedAt($value)
 */
	class NestedField extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\NestedFieldQuestion
 *
 * @property int $id
 * @property string $name
 * @property int $active
 * @property int $position
 * @property int|null $nested_field_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\NestedField|null $nested_field
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion whereNestedFieldId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NestedFieldQuestion whereUpdatedAt($value)
 */
	class NestedFieldQuestion extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Newsletter
 *
 * @property int $id
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter query()
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Newsletter whereUpdatedAt($value)
 */
	class Newsletter extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Order
 *
 * @property int $id
 * @property int|null $customer_id
 * @property string|null $delivery_address
 * @property float $subtotal
 * @property float $discount
 * @property float $dispatch
 * @property float $total
 * @property string|null $payment_type
 * @property string|null $payment_token
 * @property string|null $payment_date
 * @property int $is_paid
 * @property int $is_email
 * @property int $is_billed
 * @property string|null $billing_date
 * @property string|null $billing_receipt
 * @property string|null $delivery_date
 * @property string|null $comments
 * @property string|null $extra_data
 * @property string $status
 * @property int|null $discount_code_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $document_type
 * @property string|null $shipping_type
 * @property int $prescription_validation
 * @property float $humidity
 * @property float $temperature
 * @property string|null $voucher_pdf
 * @property string|null $dispatch_status
 * @property string|null $prescription_answer
 * @property int $is_immediate
 * @property string|null $label_dispatch
 * @property string|null $dispatch_date
 * @property string|null $house_number
 * @property string|null $ballot_number
 * @property string|null $region
 * @property string|null $type
 * @property string|null $billing_number
 * @property-read \App\Models\Customer|null $customer
 * @property-read \App\Models\DiscountCode|null $discount_code
 * @property-read mixed $formated_background
 * @property-read mixed $formated_color
 * @property-read mixed $formated_status
 * @property-read mixed $formated_type_webpay
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\OrderItem[] $order_items
 * @property-read int|null $order_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Prescription[] $prescriptions
 * @property-read int|null $prescriptions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubscriptionsOrdersItem[] $subscriptions_orders_items
 * @property-read int|null $subscriptions_orders_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Order query()
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereBallotNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereBillingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereBillingNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereBillingReceipt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereComments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeliveryAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDeliveryDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDiscountCodeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDispatch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDispatchDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDispatchStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereDocumentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereExtraData($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereHouseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereHumidity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereIsBilled($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereIsEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereIsImmediate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereIsPaid($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereLabelDispatch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePaymentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePrescriptionAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order wherePrescriptionValidation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereRegion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereShippingType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereTemperature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Order whereVoucherPdf($value)
 */
	class Order extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\OrderItem
 *
 * @property int $id
 * @property int|null $order_id
 * @property int|null $product_id
 * @property string|null $name
 * @property int $quantity
 * @property float $price
 * @property int|null $subscription_plan_id
 * @property string|null $product_attributes
 * @property float|null $extra_price
 * @property string|null $extra_description
 * @property float $subtotal
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order|null $order
 * @property-read \App\Models\Product|null $product
 * @property-read \App\Models\SubscriptionPlan|null $subscription_plan
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereExtraDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereExtraPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereProductAttributes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereSubscriptionPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OrderItem whereUpdatedAt($value)
 */
	class OrderItem extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Page
 *
 * @property int $id
 * @property string|null $name
 * @property string $section
 * @property string $type
 * @property string|null $description
 * @property string|null $link
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $position
 * @method static \Illuminate\Database\Eloquent\Builder|Page newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Page query()
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereSection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Page whereUpdatedAt($value)
 */
	class Page extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PaymentCommission
 *
 * @property int $id
 * @property string|null $start_date
 * @property string|null $end_date
 * @property float $commission
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $formated_end_date
 * @property-read mixed $formated_other_end_date
 * @property-read mixed $formated_other_start_date
 * @property-read mixed $formated_start_date
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\DayPayment[] $payment_commission
 * @property-read int|null $payment_commission_count
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission query()
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PaymentCommission whereUpdatedAt($value)
 */
	class PaymentCommission extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Post
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property string|null $content
 * @property string|null $principal_image
 * @property int $active
 * @property int|null $author_id
 * @property int|null $post_type_id
 * @property string|null $published_at
 * @property int $position
 * @property string|null $link
 * @property string|null $type
 * @property int $visits
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $author
 * @property-read mixed $formated_date
 * @property-read mixed $month
 * @property-read mixed $nice_date
 * @property-read mixed $public_principal_image
 * @property-read mixed $url
 * @property-read \App\Models\PostType|null $post_type
 * @method static \Illuminate\Database\Eloquent\Builder|Post newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Post query()
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereAuthorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePostTypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePrincipalImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post wherePublishedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Post whereVisits($value)
 */
	class Post extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\PostType
 *
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property string $slug
 * @property string|null $image
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Post[] $active_posts
 * @property-read int|null $active_posts_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Post[] $posts
 * @property-read int|null $posts_count
 * @method static \Illuminate\Database\Eloquent\Builder|PostType newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostType newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PostType query()
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PostType whereUpdatedAt($value)
 */
	class PostType extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Prescription
 *
 * @property int $id
 * @property string $name
 * @property string $file
 * @property int|null $customer_id
 * @property int|null $product_id
 * @property int|null $order_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Customer|null $customer
 * @property-read mixed $file_public
 * @property-read \App\Models\Order|null $order
 * @property-read \App\Models\Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription query()
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Prescription whereUpdatedAt($value)
 */
	class Prescription extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Price
 *
 * @property int $id
 * @property int $product_id Id de la tabla products
 * @property int $price
 * @property string|null $until
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $subscription_plan_id Id de la tabla subscription_plans
 * @property string|null $quantity
 * @property-read mixed $formated_date
 * @property-read mixed $formated_until_date
 * @property-read \App\Models\Product $product
 * @property-read \App\Models\SubscriptionPlan $subscription_plan
 * @method static \Illuminate\Database\Eloquent\Builder|Price newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Price newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Price query()
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereSubscriptionPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereUntil($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Price whereUpdatedAt($value)
 */
	class Price extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Product
 *
 * @property int $id
 * @property string|null $sku
 * @property string|null $name
 * @property string|null $slug
 * @property string|null $description
 * @property string|null $compound
 * @property int $active
 * @property int $is_offer
 * @property int $is_bioequivalent
 * @property string $consumption_typology
 * @property float|null $price
 * @property float|null $offer_price
 * @property float|null $long
 * @property float|null $height
 * @property float|null $width
 * @property float|null $weigth
 * @property int|null $stock
 * @property int|null $laboratory_id
 * @property int|null $subcategory_id
 * @property string|null $benefits
 * @property string|null $data_sheet
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $format
 * @property string|null $barcode
 * @property string|null $unit_format
 * @property int|null $unit_price
 * @property string|null $recipe_type
 * @property string|null $state_of_matter
 * @property int $outstanding
 * @property int|null $product_item_id_ailoo
 * @property int $is_immediate
 * @property int $position
 * @property int $is_medicine
 * @property int $is_indexable
 * @property-read mixed $format_compound
 * @property-read mixed $images
 * @property-read mixed $subscriptions_count
 * @property-read mixed $subscriptions_items
 * @property-read \App\Models\Laboratory|null $laboratory
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\OrderItem[] $order_items
 * @property-read int|null $order_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProductSubscriptionPlan[] $plans
 * @property-read int|null $plans_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\ProductImage[] $product_images
 * @property-read int|null $product_images_count
 * @property-read \App\Models\Subcategory|null $subcategory
 * @method static \Illuminate\Database\Eloquent\Builder|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereBarcode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereBenefits($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCompound($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereConsumptionTypology($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereDataSheet($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereIsBioequivalent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereIsImmediate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereIsIndexable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereIsMedicine($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereIsOffer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereLaboratoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereLong($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereOfferPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereOutstanding($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereProductItemIdAiloo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereRecipeType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereStateOfMatter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereSubcategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUnitFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereWeigth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Product whereWidth($value)
 */
	class Product extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProductImage
 *
 * @property int $id
 * @property string|null $file
 * @property int|null $position
 * @property int|null $product_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $public_file
 * @property-read \App\Models\Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductImage whereUpdatedAt($value)
 */
	class ProductImage extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProductSchedule
 *
 * @property int $id
 * @property string $start_time
 * @property string $end_time
 * @property int $day_of_week
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $formated_end_time
 * @property-read mixed $formated_start_time
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereDayOfWeek($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereEndTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereStartTime($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSchedule whereUpdatedAt($value)
 */
	class ProductSchedule extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ProductSubscriptionPlan
 *
 * @property int $id
 * @property string|null $warnings
 * @property int|null $product_id
 * @property int|null $subscription_plan_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $price
 * @property int|null $quantity
 * @property int $days
 * @property int|null $position
 * @property string|null $image
 * @property int $active
 * @property-read mixed $public_image
 * @property-read \App\Models\Product|null $product
 * @property-read \App\Models\SubscriptionPlan|null $subscription_plan
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereSubscriptionPlanId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ProductSubscriptionPlan whereWarnings($value)
 */
	class ProductSubscriptionPlan extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Province
 *
 * @property int $id
 * @property string $name
 * @property int|null $region_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Commune[] $communes
 * @property-read int|null $communes_count
 * @property-read \App\Models\Region|null $region
 * @method static \Illuminate\Database\Eloquent\Builder|Province newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Province newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Province query()
 * @method static \Illuminate\Database\Eloquent\Builder|Province whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Province whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Province whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Province whereRegionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Province whereUpdatedAt($value)
 */
	class Province extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Region
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Province[] $provinces
 * @property-read int|null $provinces_count
 * @method static \Illuminate\Database\Eloquent\Builder|Region newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Region newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Region query()
 * @method static \Illuminate\Database\Eloquent\Builder|Region whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Region whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Region whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Region whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Region whereUpdatedAt($value)
 */
	class Region extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\ResponsibleConsumption
 *
 * @property int $id
 * @property string|null $name
 * @property string|null $file
 * @property string|null $image
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $public_file
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption query()
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ResponsibleConsumption whereUpdatedAt($value)
 */
	class ResponsibleConsumption extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Role
 *
 * @property int $id
 * @property string $name
 * @property string $guard_name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 * @property-read int|null $users_count
 * @method static \Illuminate\Database\Eloquent\Builder|Role newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Role permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|Role query()
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereGuardName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Role whereUpdatedAt($value)
 */
	class Role extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Setting
 *
 * @property int $id
 * @property string $key
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Setting whereValue($value)
 */
	class Setting extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Subcategory
 *
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property int $position
 * @property int|null $category_id
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Category|null $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Product[] $products
 * @property-read int|null $products_count
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subcategory whereUpdatedAt($value)
 */
	class Subcategory extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Subscription
 *
 * @property int $id
 * @property string|null $card
 * @property int|null $customer_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $transbank_token
 * @property string|null $oneclick_auth_code
 * @property string|null $card_type
 * @property string|null $card_number
 * @property string|null $token_inscription
 * @property string $status
 * @property int|null $default_subscription
 * @property string|null $from
 * @property-read \App\Models\Customer|null $customer
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\SubscriptionsOrdersItem[] $subscription_orders_items
 * @property-read int|null $subscription_orders_items_count
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription query()
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereCard($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereCardNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereCardType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereCustomerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereDefaultSubscription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereOneclickAuthCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereTokenInscription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereTransbankToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Subscription whereUpdatedAt($value)
 */
	class Subscription extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SubscriptionPlan
 *
 * @property int $id
 * @property int|null $months
 * @property string|null $cicles
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProductSubscriptionPlan|null $product_subscription_plan
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereCicles($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereMonths($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionPlan whereUpdatedAt($value)
 */
	class SubscriptionPlan extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SubscriptionValue
 *
 * @property int $id
 * @property float|null $price
 * @property string|null $start_date
 * @property string|null $due_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue whereDueDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionValue whereUpdatedAt($value)
 */
	class SubscriptionValue extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\SubscriptionsOrdersItem
 *
 * @property int $id
 * @property int|null $orders_item_id
 * @property string|null $dispatch_date
 * @property string|null $pay_date
 * @property int $is_pay
 * @property int|null $customer_address_id
 * @property int|null $subscription_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $order_id
 * @property string $status
 * @property string|null $voucher_pdf
 * @property string|null $dispatch_status
 * @property string|null $delivery_address
 * @property float|null $dispatch
 * @property int|null $commune_id
 * @property int $quantity
 * @property int|null $order_parent_id
 * @property string|null $name
 * @property float|null $price
 * @property float|null $subtotal
 * @property string|null $period
 * @property int|null $days
 * @property int $active
 * @property int $payment_attempt
 * @property int $free_shipping
 * @property-read \App\Models\Commune|null $commune
 * @property-read \App\Models\CustomerAddress|null $customer_address
 * @property-read \App\Models\Order|null $order
 * @property-read \App\Models\OrderItem|null $order_item
 * @property-read \App\Models\Order|null $order_parent
 * @property-read \App\Models\Subscription|null $subscription
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem query()
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereCommuneId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereCustomerAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereDeliveryAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereDispatch($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereDispatchDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereDispatchStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereFreeShipping($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereIsPay($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereOrderParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereOrdersItemId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem wherePayDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem wherePaymentAttempt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem wherePeriod($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereSubscriptionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|SubscriptionsOrdersItem whereVoucherPdf($value)
 */
	class SubscriptionsOrdersItem extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\TextHeader
 *
 * @property int $id
 * @property string|null $text
 * @property string|null $link
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader query()
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader whereLink($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|TextHeader whereUpdatedAt($value)
 */
	class TextHeader extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Timeline
 *
 * @property int $id
 * @property string|null $description
 * @property string|null $icon
 * @property string|null $year
 * @property int|null $post_id
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $slug
 * @property int|null $position
 * @property-read mixed $public_icon
 * @property-read \App\Models\Post|null $post
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline query()
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereIcon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline wherePostId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Timeline whereYear($value)
 */
	class Timeline extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\User
 *
 * @property int $id
 * @property string|null $user_id
 * @property string|null $rut
 * @property string $first_name
 * @property string $last_name
 * @property string|null $second_last_name
 * @property string|null $phone
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $recovery_pin
 * @property string|null $last_access
 * @property string|null $avatar
 * @property string $theme
 * @property int $active
 * @property int $editable
 * @property int $removable
 * @property int $viewable
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Client[] $clients
 * @property-read int|null $clients_count
 * @property-read mixed $avatar_public
 * @property-read mixed $full_name
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Passport\Token[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Query\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User permission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User role($roles, $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEditable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastAccess($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRecoveryPin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRemovable($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRut($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereSecondLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereTheme($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereViewable($value)
 * @method static \Illuminate\Database\Query\Builder|User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\Value
 *
 * @property int $id
 * @property string|null $description
 * @property string|null $image
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $public_image
 * @method static \Illuminate\Database\Eloquent\Builder|Value newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Value newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Value query()
 * @method static \Illuminate\Database\Eloquent\Builder|Value whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Value whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Value whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Value whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Value whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Value whereUpdatedAt($value)
 */
	class Value extends \Eloquent {}
}

namespace App\Models{
/**
 * App\Models\WebpayLog
 *
 * @property int $id
 * @property int|null $order_id
 * @property string|null $accounting_date
 * @property string|null $buy_order
 * @property string|null $card_number
 * @property string|null $card_expiration_date
 * @property string|null $authorization_code
 * @property string|null $payment_type_code
 * @property string|null $response_code
 * @property string|null $shares_number
 * @property string|null $amount
 * @property string|null $commerce_code
 * @property string|null $session_id
 * @property string|null $transaction_date
 * @property string|null $url_redirection
 * @property string|null $vci
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read mixed $payment_type_code_description
 * @property-read mixed $response_code_description
 * @property-read \App\Models\Order|null $order
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog query()
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereAccountingDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereAuthorizationCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereBuyOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereCardExpirationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereCardNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereCommerceCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog wherePaymentTypeCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereResponseCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereSharesNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereTransactionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereUrlRedirection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|WebpayLog whereVci($value)
 */
	class WebpayLog extends \Eloquent {}
}

